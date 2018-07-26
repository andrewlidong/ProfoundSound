// Generate a fractal tree

// If a branch is long enough, add two branches to the left and right.  Both new branches should be slightly shorter than their parent.

export function draw(startX, startY, len, angle, branchWidth, ctx, canvasEl) {
  ctx.beginPath();
  ctx.save();

  ctx.translate(startX, startY);
  ctx.rotate(angle * Math.PI/180);
  ctx.moveTo(0,0);
  ctx.lineTo(0,-len);
  // change branch color
  ctx.strokeStyle = 'black';
  // change leaf color
  ctx.fillStyle = 'darkred';
  // add branchwidth
  ctx.lineWidth = branchWidth;
  // add shadow
  ctx.shadowBlur = 15;
  ctx.shadowColor = "pink";
  ctx.stroke();

  if (len < 10) {
    ctx.beginPath();
    ctx.arc(0,-len, 10, 0, Math.PI/2);
    ctx.fill();
    ctx.restore();
    return;
  }


  draw(0, -len, len*0.8, angle + 10, branchWidth * 0.8, ctx, canvasEl);
  draw(0, -len, len*0.8, angle - 10, branchWidth * 0.8, ctx, canvasEl);

  ctx.restore();
}
