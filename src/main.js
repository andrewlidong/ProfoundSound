import * as TREE from "./tree";
// import * as SUN from './sun';
import * as D3BAR from "./d3bar";
import * as d3 from "d3";

document.addEventListener('DOMContentLoaded', () => {

    let audio = document.getElementById("audioElement");

    const playButton = document.querySelector('.play-button');
    playButton.addEventListener('click', () => {
      audio.play();
    });

    const pauseButton = document.querySelector('.pause-button');
    pauseButton.addEventListener('click', () => {
      audio.pause();
    });

    const volBarSlider = document.querySelector('.vol-bar-slider');
    volBarSlider.addEventListener('input', e => {
      audio.volume = e.currentTarget.value / 100;
    });

    const closeButton = document.getElementsByClassName('close')[0];
    const modal = document.getElementsByClassName('modal')[0];
    const question = document.getElementsByClassName('help')[0];

    modal.addEventListener("click", function(){
      modal.classList.add("closed");
      audio.play();
    });

    closeButton.addEventListener("click", function(){
      modal.classList.add("closed");
      audio.play();
    });


    question.addEventListener("click", function() {
      modal.classList.remove("closed");
    });

    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let audioElement = document.getElementById('audioElement');

    audioElement.crossOrigin = "anonymous";

    let audioSrc = audioCtx.createMediaElementSource(audioElement);
    let analyser = audioCtx.createAnalyser();
    analyser.smoothingTimeConstant = 0.5;
    analyser.fftSize = 256;

    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);

    let frequencyData = new Uint8Array(analyser.frequencyBinCount);


    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function drawSun(context, frequencyDataPoint) {
        let transparency;
        let hue = 40;

        let x = ((canvas.width - 400)),
            y = ((200));

        if (false){
          transparency = 0.01;
        } else {
          transparency = 0.08;
        }

        context.beginPath();
        context.arc(x, y, (Math.abs(frequencyDataPoint-100)) * 2 , 0, 2 * Math.PI);
        context.strokeStyle = 'hsla(' + hue + ', ' + 100 + '%,' + 40 + '%,' + transparency  + ')';
        context.fillStyle = "hsla(" + hue + ", 100%, 60%, .01)";

        context.fill();
        context.lineWidth = 2;
        context.stroke();
    }

    function animateSun(ctx, canvasWidth, canvasHeight, analyser) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        analyser.getByteTimeDomainData(frequencyData);

          for (let i = 0; i < frequencyData.length; i += 1) {
              let frequencyDataPoint = frequencyData[i];
              drawSun(context, frequencyDataPoint);
            }

        requestAnimationFrame(animateSun.bind(this, ctx, canvasWidth, canvasHeight, analyser));
    }

    animateSun(context, canvas.width, canvas.height, analyser);

    const treeCanvas = document.getElementById('treeCanvas');
    const treeContext = treeCanvas.getContext('2d');
    treeCanvas.width = window.innerWidth;
    treeCanvas.height = window.innerHeight;

    TREE.drawTree(treeCanvas.width/2, treeCanvas.height, 150, 0, 20, treeContext, treeCanvas, "black", "red", "pink");


    let svgHeight= window.innerHeight;
    let svgWidth= window.innerWidth + 1700;
    let barPadding='15';

    let svg = D3BAR.createSvg('.frequency-bar', svgHeight, svgWidth);

    svg.selectAll('rect')
      .data(frequencyData)
      .enter()
      .append('rect')
      .attr('x', function(d,i) {
        return i * (svgWidth / frequencyData.length);
      })
      .attr('width', svgWidth / frequencyData.length - barPadding);

    function renderChart() {
      requestAnimationFrame(renderChart);

      analyser.getByteFrequencyData(frequencyData);

      svg.selectAll('rect')
        .data(frequencyData)
        .attr('y', function(d) {
          return svgHeight - d;
        })
        .attr('height', function(d) {
          return d;
        })
        .attr('fill', function(d) {
          return 'rgb(0, 200,' + d + ')';
        });
    }

    renderChart();
});
