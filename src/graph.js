import * as d3 from "d3";

// Helper function to create SVG

let dataset = [12, 19, 8, 17, 22, 9, 15, 12, 22, 25, 17, 12, 25, 16];


// height and width of our Scalable Vector Graphic
let svgHeight = 100;
let svgWidth = 600;
let barPadding = 1;

// accepts a parent DOM element selector that the SVG wil be appended to.
export function createSvg(parent, height, width) {
      // tells D3 to select a DOM element to be acted upon.
      // selects the parent element
      // creates a new SVG element and appends it within the parent.
      // sets the height and width attributes
			return d3.select(parent)
					 .append('svg')
					 .attr('height', height)
					 .attr('width', width);
		}

// creates the SVG and stores the reference to the SVG element in the graph variable
let graph = createSvg('#graph', svgHeight, svgWidth);

// find all elements within our SVG and binds our array of numbers to those references
// D3 looks at the data and creates element references based on the data.
// appends those new elements to the DOM.

export function displayGraph(graph) {
  graph.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('width', svgWidth / dataset.length - barPadding)
  .attr('height', function (d) {
    return d * 4;
  })
  .attr('x', function (d, i) {
    return i * (svgWidth / dataset.length);
  })
  .attr('y', function (d) {
    return svgHeight - (d * 4); // Align the bars to the bottom of the SVG.
  });
}
