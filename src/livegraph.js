//
// // where we copy our audio frequency data to.
// let frequencyData = new Uint8Array(200);
//
// // increased size of svg to accomodate larger amounts of data points.
// let svgHeight='300';
// let svgWidth='1200';
// let barPadding='1';
//
// export function createSvg(parent, height, width) {
//   return d3.select(parent).append('svg').attr('height', height).attr('width', width);
// }
//
// let svg = createSvg('body', svgHeight, svgWidth);
//
// svg.selectAll('rect')
//   .data(frequencyData)
//   .enter()
//   .append('rect')
//   .attr('x',function(d,i) {
//     return i * (svgWidth / frequencyData.length);
//   })
//   .attr('width', svgWidth / frequencyData.length - barPadding);
//
// // constantly streaming audio data to the browser arnd dynamically updating the D3 bar chart
//
// // continuously loop and update chart with frequency data.
// export function renderChart() {
//   console.log(frequencyData);
//   // window.requestAnimationFrame tells the browser to run renderChart() before repainting the screen.
//   requestAnimationFrame(renderChart);
//
//   // Copy frequency data to frequencyData array
//   // uses attached AnalyserNode to grab frequency data of audio and copy it to Uint8ArrayfrequencyData
//
//   analyser.getByteFrequencyData(frequencyData);
//
//   // Update d3 chart with new data.
//   svg.selectAll('rect')
//     .data(frequencyData)
//     .attr('y', function(d) {
//       return svgHeight - d;
//     })
//     .attr('height', function(d) {
//       return d;
//     })
//     .attr('fill', function(d) {
//       return 'rgb(0, 0, ' + d + ')';
//     });
// }
//
// renderChart();
