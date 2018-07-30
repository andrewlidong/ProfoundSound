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

  drawTree(0, -len, (len*0.8), angle + 10, branchWidth * 0.8, treeContext, canvasEl);
  drawTree(0, -len, (len*0.8), angle - 10, branchWidth * 0.8, treeContext, canvasEl);

  treeContext.restore();
}


let timestamp;
let factor = 1;

export const step = val => () => {
  // const time = Date.now();
  // if (time - timestamp < 100000) {
  //   requestAnimationFrame(step(val));
  // }
  // debugger

  // timestamp = time;

  treeContext.clearRect(0, 0, treeCanvas.width, treeCanvas.height);
  TREE.drawTree(treeCanvasWidth/2, treeCanvasHeight, 180, val, 20, treeContext, treeCanvas, "black", "darkblue", "pink");

  if (val >= 1) {
    // debugger
    factor = -1;
  }

  if (val <= -1) {
    factor = 1;
  }

  val += factor;

  requestAnimationFrame(step(val));
};

export const animate = () => {
  timestamp = Date.now();
  requestAnimationFrame(step(0));
};

// const time = Date.now();
// if (timestamp !== 0) {
//   animate();
// }
// else if (time - timestamp < 10000) {
//   animate();
// }
