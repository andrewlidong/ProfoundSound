// import * as KOCH_CURVE from "./koch_curve";
// import * as GRAPH from "./graph";
import * as MODAL from "./modal";
import * as TREE from "./tree";
// import * as SUN from "./sun";
import * as SUN from './sun';
import * as D3BAR from "./d3bar";
import * as d3 from "d3";

document.addEventListener('DOMContentLoaded', () => {



    // Audio buttons

    let audio = document.getElementById("audioElement");

    const playButton = document.querySelector('.play-button');
    playButton.addEventListener('click', () => {
      audio.play();
    });

    const pauseButton = document.querySelector('.pause-button');
    pauseButton.addEventListener('click', () => {
      audio.pause();
    });

    // const volBarSlider = document.querySelector('.vol-bar-slider');
    // volBarSlider.addEventListener('mousedown', (e) => {
    //   volBarSlider.addEventListener('change', e => {
    //     audio.volume = (e.target.value * 1) / 100;
    //     console.log(e.target.value); // between 0 and 100 as string
    //   });
    // });

    const volBarSlider = document.querySelector('.vol-bar-slider');
    volBarSlider.addEventListener('change', e => {
      audio.volume = e.currentTarget.value / 100;
    });


    const closeButton = document.getElementsByClassName('close')[0];
    const modal = document.getElementsByClassName('modal')[0];
    const question = document.getElementsByClassName('help')[0];

    closeButton.addEventListener("click", function(){
      modal.classList.add("closed");
      audio.play();
    });


    question.addEventListener("click", function() {
      modal.classList.remove("closed");
    });


    // Hooking audioElement to web audio api

    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let audioElement = document.getElementById('audioElement');

    audioElement.crossOrigin = "anonymous";

    let audioSrc = audioCtx.createMediaElementSource(audioElement);
    let analyser = audioCtx.createAnalyser();
    analyser.smoothingTimeConstant = 0.5;
    analyser.fftSize = 256;


    // Bind analyser to the media element source.
    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);

    let frequencyData = new Uint8Array(50);


    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    SUN.animateSun(context, canvas.width, canvas.height, analyser);

    const treeCanvas = document.getElementById('treeCanvas');
    const treeContext = treeCanvas.getContext('2d');
    treeCanvas.width = window.innerWidth;
    treeCanvas.height = window.innerHeight;

    TREE.drawTree(treeCanvas.width/2, treeCanvas.height, 180, 0, 20, treeContext, treeCanvas, "black", "darkblue", "pink");



    // where we copy our audio frequency data to.

    // increased size of svg to accomodate larger amounts of data points.
    let svgHeight='1000';
    let svgWidth= '1000';
    let barPadding='5';


    let svg = D3BAR.createSvg('.frequency-bar', svgHeight, svgWidth);

    svg.selectAll('rect')
      .data(frequencyData)
      .enter()
      .append('rect')
      .attr('x',function(d,i) {
        return i * (svgWidth / frequencyData.length);
      })
      .attr('width', svgWidth / frequencyData.length - barPadding);

    // constantly streaming audio data to the browser arnd dynamically updating the D3 bar chart

    // continuously loop and update chart with frequency data.
    function renderChart() {
      console.log(frequencyData);
      // window.requestAnimationFrame tells the browser to run renderChart() before repainting the screen.
      requestAnimationFrame(renderChart);

      // Copy frequency data to frequencyData array
      // uses attached AnalyserNode to grab frequency data of audio and copy it to Uint8ArrayfrequencyData

      analyser.getByteFrequencyData(frequencyData);

      // Update d3 chart with new data.
      svg.selectAll('rect')
        .data(frequencyData)
        .attr('y', function(d) {
          return svgHeight - d;
        })
        .attr('height', function(d) {
          return d;
        })
        .attr('fill', function(d) {
          return 'rgb(0, 0, 0,  ' + d + ')';
        });
    }

    renderChart();
});





// // BLACK BARS
//
// // height and width of our Scalable Vector Graphic
// let svgHeight = 100;
// let svgWidth = 600;
// let barPadding = 1;
//
// let graph = GRAPH.createSvg('#graph', svgHeight, svgWidth);
//
//
// GRAPH.displayGraph(graph);


// MY KOCH

// const myKoch = document.getElementById("koch_curve");
// const ctxKoch = myKoch.getContext("2d");
//
// KOCH_CURVE.draw(ctxKoch, myKoch);

// RENDER TREE

// function renderTree() {
//   const myTree = document.getElementById("fractal_tree");
//   const ctxTree = myTree.getContext("2d");
//
//   console.log(frequencyData);
//   //
//   requestAnimationFrame(renderTree);
//   //
//   analyser.getByteFrequencyData(frequencyData);
//
//   FRACTAL_TREE.draw(360, 600, 120, 0, 20, ctxTree, myTree, "black", "darkred", "pink");
//
//   // if (frequencyData[frequencyData.length/2] === 0){
//   //   FRACTAL_TREE.draw(360, 600, 120, 0, 20, ctxTree, myTree, "black", "darkred", "pink");
//   //   ctxTree.clearRect(0,0, myTree.width, myTree.height);
//   // } else if (frequencyData[frequencyData.length/2] > 50) {
//   //   FRACTAL_TREE.draw(360, 600, 120, 0, 20, ctxTree, myTree, "blue", "darkred", "pink");
//   //   ctxTree.clearRect(0,0, myTree.width, myTree.height);
//   // } else if (frequencyData[frequencyData.length/2] < 50) {
//   //   FRACTAL_TREE.draw(360, 600, 120, 0, 20, ctxTree, myTree, "red", "darkred", "pink");
//   //   ctxTree.clearRect(0,0, myTree.width, myTree.height);
//   // }
//
// }
//
// renderTree();
