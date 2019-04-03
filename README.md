# Profound Sound

## About

Profound Sound is a music visualization app that allows users to watch, listen and dance along to visual representations of This Must Be The Place by The Talking Heads.  

The app is powered by vanilla JavaScript DOM manipulation of an HTML canvas element, along with Web Audio API and D3 interaction which allow the translation of waves of sound into visual displays.  

Access the live site [here](http://andrewlidong.xyz/ProfoundSound/
).

## Demo

<img src="https://media.giphy.com/media/d2StSulGRSqdWuLnmT/giphy.gif" height="400" alt="profoundsound-gif">

## Architecture and Technologies

The project is implemented with the following technologies:

- `JavaScript ES6` for integrating various apis,
- `Web Audio API` for extracting data relating to the waveform of the sound of an html5 audio element
- `D3` to display scalable vector graphics dependent on the data extracted from `Web Audio API`
- `HTML5` for formatting
- `CSS3` for styling components
- `Webpack4` to bundle js files


## Technical Implementation

Some technical highlights of the app are:

1. Recursive rendering of a binary tree
2. Extraction of frequency data
3. Dynamic re-rendering of a canvas sphere
4. Dynamic re-rendering of an SVG chart by integrating D3 API

### Recursive rendering of a binary tree

At the centerpiece of Profound Sound is a recursively rendered binary tree in Canvas, which begins with a single branch length and grows until the deepest branches (those with length < 10) are filled with leaves.  

```javascript
  // from tree.js

  export function drawTree(startX, startY, len, angle, branchWidth, treeContext, canvasEl,
                        branchColor, leafColor, shadowColor) {

    treeContext.beginPath();
    treeContext.save();

    treeContext.lineWidth = branchWidth;
    treeContext.strokeStyle = branchColor;
    treeContext.fillStyle = leafColor;
    treeContext.shadowBlur = 15;
    treeContext.shadowColor = shadowColor;

    treeContext.translate(startX, startY);
    treeContext.rotate(angle * Math.PI/180);
    treeContext.moveTo(0,0);
    treeContext.lineTo(0,-len);

    treeContext.stroke();

    if (len < 10) {
      treeContext.beginPath();
      treeContext.arc(0,-len, 10, 0, Math.PI/2);
      treeContext.fill();
      treeContext.restore();
      return;
    }

    drawTree(0, -len, (len*0.8) - 0.5, angle + 10, branchWidth * 0.8, treeContext, canvasEl);
    drawTree(0, -len, (len*0.8) - 0.5, angle - 10, branchWidth * 0.8, treeContext, canvasEl);

    treeContext.restore();
  }
```

### Extraction of frequency data

In order to extract data from its audio file, Profound Sound integrates with Web Audio API.  In the following code snippet we create a media element source and an audio analyzer.  We then proceed to connect the two and create an array of unsigned integers from the frequencyBinCount of the analyzer, which will later be used for visualizations.  

```javascript
  // from main.js

  let audio = document.getElementById("audioElement");
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

```


### Dynamic re-rendering of a canvas sphere

To render the dancing sun using canvas, we take the first element the array of unsigned integers from our frequencyData and pass that into the draw function as the parameter for the radius of our sun.  Since we need to clear the canvas upon each re-render, we're forced to set the animation on a separate canvas element.  We're also able to dynamically set the hue of the sun.  

```javascript
  // from main.js

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
```


### Dynamic re-rendering of an SVG chart by integrating D3

To render the dancing grass we pull a scalable vector graph from the D3 library and pass in our frequency data.  We're able to constantly re-render the chart using request animation frame from Canvas.  The color also adjusts dynamically based on the height of each rectangle in the chart.  

```javascript
  // from main.js

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
```