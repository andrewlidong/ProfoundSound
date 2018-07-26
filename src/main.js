import * as KOCH_CURVE from "./koch_curve";
import * as FRACTAL_TREE from "./fractal_tree";
import * as GRAPH from "./graph";
import * as LIVEGRAPH from "./livegraph";

document.addEventListener('DOMContentLoaded', () => {
    // const question = document.getElementsByClassName('help')[0];
    const closeButton = document.getElementsByClassName('close')[0];
    const modal = document.getElementsByClassName('modal')[0];

    closeButton.addEventListener("click", function(){
      modal.classList.add("closed");
    });

    // question.addEventListener("click", function() {
    //   modal.classList.remove("closed");
    // });


    // MY KOCH

    // const myKoch = document.getElementById("koch_curve");
    // const ctxKoch = myKoch.getContext("2d");
    //
    // KOCH_CURVE.draw(ctxKoch, myKoch);


    const myTree = document.getElementById("fractal_tree");
    const ctxTree = myTree.getContext("2d");


    FRACTAL_TREE.draw(350, 600, 120, 0, 20, ctxTree, myTree);

    let audio = document.getElementById("audioElement");

    const playButton = document.querySelector('.play-button');
    playButton.addEventListener('click', () => {
      audio.play();
    });

    const pauseButton = document.querySelector('.pause-button');
    pauseButton.addEventListener('click', () => {
      audio.pause();
    });

    const volUpButton = document.querySelector('.volup-button');
    volUpButton.addEventListener('click', () => {
      audio.volume += 0.1;
    });

    const volDownButton = document.querySelector('.voldown-button');
    volDownButton.addEventListener('click', () => {
      audio.volume -= 0.1;
    });


    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let audioElement = document.getElementById('audioElement');
    audioElement.crossOrigin = "anonymous";
    // audioElement.src = "../assets/audio/colors.mp3";
    let audioSrc = audioCtx.createMediaElementSource(audioElement);
    let analyser = audioCtx.createAnalyser();


    // Bind analyser to the media element source.
    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);



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




    // where we copy our audio frequency data to.
    let frequencyData = new Uint8Array(200);

    // increased size of svg to accomodate larger amounts of data points.
    let svgHeight='300';
    let svgWidth='1200';
    let barPadding='1';

    function createSvg(parent, height, width) {
      return d3.select(parent).append('svg').attr('height', height).attr('width', width);
    }

    let svg = createSvg('body', svgHeight, svgWidth);

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
          return 'rgb(0, 0, ' + d + ')';
        });
    }

    renderChart();

});
