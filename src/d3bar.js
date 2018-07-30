import * as d3 from "d3";


export function createSvg(parent, height, width) {
  return d3.select(parent)
    .append('svg')
    .attr('height', height)
    .attr('width', width);
}
