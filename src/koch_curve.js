




// Thue-Morse Sequence

// Generates the complement of the previous digit
// Appends the complement to the sequence...
// With every iteration the size of the sequence doubles.

export function generateSequence() {
    let sequence = "0";
    for (let i = 0; i < 10; i ++) {
      const parts = sequence.split("");
      let complement = "";
      for (let j = 0; j < parts.length; j++) {
        complement = complement + (parts[j] == "0" ? "1" : "0");
      }
      sequence += complement;
    }
    // console.log("sequenceGenerated");
    return sequence;
  }



// Generating the Koch Curve

// Everytime we encounter a zero, draw a straight line of fixed length
// Everytime we encounter a one, rotate the canvas by 60 degrees.

  export function draw(ctx, canvasEl) {
    let sequence = generateSequence();
    let parts = sequence.split("");
    ctx.translate(0, canvasEl.height);
    ctx.beginPath();
    ctx.moveTo(0,0);
    for (var i = 0; i < parts.length; i++) {
      if (parts[i] == "0") {
        ctx.translate(0,50);
        ctx.lineTo(0,50);
      } else {
        ctx.rotate(Math.PI/3);
      }
    }
    ctx.strokeStyle = 'red';
    ctx.stroke();
  }
