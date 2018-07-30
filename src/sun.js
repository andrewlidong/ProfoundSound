export function drawSun(context, freqValue, freqSequence) {
    let transparency;
    let hue = 250;

    let x = ((canvas.width - 200)),
        y = ((200));
    if (false){
      transparency = 0.01;
    } else {
      transparency = 0.08;
    }
    context.beginPath();
    context.arc(x-(freqValue / 8), y-(freqValue / 8), (Math.abs(freqValue-120)) * 5 , 0, 2 * Math.PI, false);
    context.strokeStyle = 'hsla(' + hue + ', ' + 100 + '%,' + 40 + '%,' + transparency  + ')';
    context.fillStyle = "hsla(" + hue + ", 100%, 40%, .01)";

    context.fill();
    context.lineWidth = 2;
    context.stroke();
}

export function animateSun(context, canvasWidth, canvasHeight, analyser) {
    let freqArray;

    debugger
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    freqArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(freqArray);

      for (let i = 0; i < freqArray.length; i += 1) {
          let point = freqArray[i];
          drawSun(context, point, i);
          // drawTree(treeCanvasWidth/2, treeCanvasHeight -100, 150, point, 20, treeContext, treeCanvas, "black", "darkred", "pink");
        }

    requestAnimationFrame(animateSun);
}
