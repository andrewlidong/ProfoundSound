export function createSvg(parent, height, width) {
  return d3.select(parent)
    .append('svg')
    .attr('height', height)
    .attr('width', width);
}
