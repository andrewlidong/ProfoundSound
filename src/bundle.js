/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/graph.js":
/*!**********************!*\
  !*** ./src/graph.js ***!
  \**********************/
/*! exports provided: createSvg, displayGraph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createSvg\", function() { return createSvg; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"displayGraph\", function() { return displayGraph; });\n// Helper function to create SVG\n\nlet dataset = [12, 19, 8, 17, 22, 9, 15, 12, 22, 25, 17, 12, 25, 16];\n\n// height and width of our Scalable Vector Graphic\nlet svgHeight = 100;\nlet svgWidth = 600;\nlet barPadding = 1;\n\n// accepts a parent DOM element selector that the SVG wil be appended to.\nfunction createSvg(parent, height, width) {\n  // tells D3 to select a DOM element to be acted upon.\n  // selects the parent element\n  // creates a new SVG element and appends it within the parent.\n  // sets the height and width attributes\n  return d3.select(parent).append('svg').attr('height', height).attr('width', width);\n}\n\n// creates the SVG and stores the reference to the SVG element in the graph variable\nlet graph = createSvg('#graph', svgHeight, svgWidth);\n\n// find all elements within our SVG and binds our array of numbers to those references\n// D3 looks at the data and creates element references based on the data.\n// appends those new elements to the DOM.\n\nfunction displayGraph(graph) {\n  graph.selectAll('rect').data(dataset).enter().append('rect').attr('width', svgWidth / dataset.length - barPadding).attr('height', function (d) {\n    return d * 4;\n  }).attr('x', function (d, i) {\n    return i * (svgWidth / dataset.length);\n  }).attr('y', function (d) {\n    return svgHeight - d * 4; // Align the bars to the bottom of the SVG.\n  });\n}\n\n//# sourceURL=webpack:///./src/graph.js?");

/***/ }),

/***/ "./src/koch_curve.js":
/*!***************************!*\
  !*** ./src/koch_curve.js ***!
  \***************************/
/*! exports provided: generateSequence, draw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateSequence\", function() { return generateSequence; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"draw\", function() { return draw; });\n\n\n// Thue-Morse Sequence\n\n// Generates the complement of the previous digit\n// Appends the complement to the sequence...\n// With every iteration the size of the sequence doubles.\n\nfunction generateSequence() {\n  let sequence = \"0\";\n  for (let i = 0; i < 10; i++) {\n    const parts = sequence.split(\"\");\n    let complement = \"\";\n    for (let j = 0; j < parts.length; j++) {\n      complement = complement + (parts[j] == \"0\" ? \"1\" : \"0\");\n    }\n    sequence += complement;\n  }\n  // console.log(\"sequenceGenerated\");\n  return sequence;\n}\n\n// Generating the Koch Curve\n\n// Everytime we encounter a zero, draw a straight line of fixed length\n// Everytime we encounter a one, rotate the canvas by 60 degrees.\n\nfunction draw(ctx, canvasEl) {\n  let sequence = generateSequence();\n  let parts = sequence.split(\"\");\n  ctx.translate(0, canvasEl.height);\n  ctx.beginPath();\n  ctx.moveTo(0, 0);\n  for (var i = 0; i < parts.length; i++) {\n    if (parts[i] == \"0\") {\n      ctx.translate(0, 50);\n      ctx.lineTo(0, 50);\n    } else {\n      ctx.rotate(Math.PI / 3);\n    }\n  }\n  ctx.strokeStyle = 'red';\n  ctx.stroke();\n}\n\n//# sourceURL=webpack:///./src/koch_curve.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _koch_curve__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./koch_curve */ \"./src/koch_curve.js\");\n/* harmony import */ var _graph__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graph */ \"./src/graph.js\");\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal */ \"./src/modal.js\");\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modal__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tree */ \"./src/tree.js\");\n/* harmony import */ var _sun__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sun */ \"./src/sun.js\");\n\n\n\n\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n\n  // Audio buttons\n\n  let audio = document.getElementById(\"audioElement\");\n\n  const playButton = document.querySelector('.play-button');\n  playButton.addEventListener('click', () => {\n    audio.play();\n  });\n\n  const pauseButton = document.querySelector('.pause-button');\n  pauseButton.addEventListener('click', () => {\n    audio.pause();\n  });\n\n  // const volBarSlider = document.querySelector('.vol-bar-slider');\n  // volBarSlider.addEventListener('mousedown', (e) => {\n  //   volBarSlider.addEventListener('change', e => {\n  //     audio.volume = (e.target.value * 1) / 100;\n  //     console.log(e.target.value); // between 0 and 100 as string\n  //   });\n  // });\n\n  const volBarSlider = document.querySelector('.vol-bar-slider');\n  volBarSlider.addEventListener('change', e => {\n    audio.volume = e.currentTarget.value / 100;\n  });\n\n  const closeButton = document.getElementsByClassName('close')[0];\n  const modal = document.getElementsByClassName('modal')[0];\n  const question = document.getElementsByClassName('help')[0];\n\n  closeButton.addEventListener(\"click\", function () {\n    modal.classList.add(\"closed\");\n    audio.play();\n  });\n\n  question.addEventListener(\"click\", function () {\n    modal.classList.remove(\"closed\");\n  });\n\n  // Hooking audioElement to web audio api\n\n  let audioCtx = new (window.AudioContext || window.webkitAudioContext)();\n  let audioElement = document.getElementById('audioElement');\n\n  audioElement.crossOrigin = \"anonymous\";\n\n  let audioSrc = audioCtx.createMediaElementSource(audioElement);\n  let analyser = audioCtx.createAnalyser();\n  analyser.smoothingTimeConstant = 0.5;\n  analyser.fftSize = 256;\n\n  // Bind analyser to the media element source.\n  audioSrc.connect(analyser);\n  audioSrc.connect(audioCtx.destination);\n\n  let frequencyData = new Uint8Array(50);\n\n  const canvas = document.getElementById('canvas');\n  const context = canvas.getContext('2d');\n  canvas.width = window.innerWidth;\n  canvas.height = window.innerHeight;\n\n  const treeCanvas = document.getElementById('treeCanvas');\n  const treeContext = treeCanvas.getContext('2d');\n  treeCanvas.width = window.innerWidth;\n  treeCanvas.height = window.innerHeight;\n\n  let timestamp;\n  let factor = 1;\n\n  const step = val => () => {\n    // const time = Date.now();\n    // if (time - timestamp < 100000) {\n    //   requestAnimationFrame(step(val));\n    // }\n    // debugger\n\n    // timestamp = time;\n\n    treeContext.clearRect(0, 0, treeCanvas.width, treeCanvas.height);\n    _tree__WEBPACK_IMPORTED_MODULE_3__[\"drawTree\"](treeCanvasWidth / 2, treeCanvasHeight, 180, val, 20, treeContext, treeCanvas, \"black\", \"darkblue\", \"pink\");\n\n    if (val >= 1) {\n      // debugger\n      factor = -1;\n    }\n\n    if (val <= -1) {\n      factor = 1;\n    }\n\n    val += factor;\n\n    requestAnimationFrame(step(val));\n  };\n\n  const animate = () => {\n    timestamp = Date.now();\n    requestAnimationFrame(step(0));\n  };\n\n  // const time = Date.now();\n  // if (timestamp !== 0) {\n  //   animate();\n  // }\n  // else if (time - timestamp < 10000) {\n  //   animate();\n  // }\n\n  _tree__WEBPACK_IMPORTED_MODULE_3__[\"drawTree\"](treeCanvas.width / 2, treeCanvas.height, 180, 0, 20, treeContext, treeCanvas, \"black\", \"darkblue\", \"pink\");\n\n  function animateSun() {\n    let freqArray;\n\n    context.clearRect(0, 0, canvas.width, canvas.height);\n    freqArray = new Uint8Array(analyser.frequencyBinCount);\n    analyser.getByteTimeDomainData(freqArray);\n\n    for (let i = 0; i < freqArray.length; i += 1) {\n      let point = freqArray[i];\n      _sun__WEBPACK_IMPORTED_MODULE_4__[\"drawSun\"](context, point, i);\n      // drawTree(treeCanvasWidth/2, treeCanvasHeight -100, 150, point, 20, treeContext, treeCanvas, \"black\", \"darkred\", \"pink\");\n    }\n\n    requestAnimationFrame(animateSun);\n  }\n\n  animateSun();\n\n  // where we copy our audio frequency data to.\n\n  // increased size of svg to accomodate larger amounts of data points.\n  let svgHeight = '1000';\n  let svgWidth = '1000';\n  let barPadding = '5';\n\n  function createSvg(parent, height, width) {\n    return d3.select(parent).append('svg').attr('height', height).attr('width', width);\n  }\n\n  let svg = createSvg('.frequency-bar', svgHeight, svgWidth);\n\n  svg.selectAll('rect').data(frequencyData).enter().append('rect').attr('x', function (d, i) {\n    return i * (svgWidth / frequencyData.length);\n  }).attr('width', svgWidth / frequencyData.length - barPadding);\n\n  // constantly streaming audio data to the browser arnd dynamically updating the D3 bar chart\n\n  // continuously loop and update chart with frequency data.\n  function renderChart() {\n    console.log(frequencyData);\n    // window.requestAnimationFrame tells the browser to run renderChart() before repainting the screen.\n    requestAnimationFrame(renderChart);\n\n    // Copy frequency data to frequencyData array\n    // uses attached AnalyserNode to grab frequency data of audio and copy it to Uint8ArrayfrequencyData\n\n    analyser.getByteFrequencyData(frequencyData);\n\n    // Update d3 chart with new data.\n    svg.selectAll('rect').data(frequencyData).attr('y', function (d) {\n      return svgHeight - d;\n    }).attr('height', function (d) {\n      return d;\n    }).attr('fill', function (d) {\n      return 'rgb(0, 0, 0,  ' + d + ')';\n    });\n  }\n\n  renderChart();\n});\n\n// // OPEN MODAL\n\n\n// // BLACK BARS\n//\n// // height and width of our Scalable Vector Graphic\n// let svgHeight = 100;\n// let svgWidth = 600;\n// let barPadding = 1;\n//\n// let graph = GRAPH.createSvg('#graph', svgHeight, svgWidth);\n//\n//\n// GRAPH.displayGraph(graph);\n\n\n// MY KOCH\n\n// const myKoch = document.getElementById(\"koch_curve\");\n// const ctxKoch = myKoch.getContext(\"2d\");\n//\n// KOCH_CURVE.draw(ctxKoch, myKoch);\n\n// RENDER TREE\n\n// function renderTree() {\n//   const myTree = document.getElementById(\"fractal_tree\");\n//   const ctxTree = myTree.getContext(\"2d\");\n//\n//   console.log(frequencyData);\n//   //\n//   requestAnimationFrame(renderTree);\n//   //\n//   analyser.getByteFrequencyData(frequencyData);\n//\n//   FRACTAL_TREE.draw(360, 600, 120, 0, 20, ctxTree, myTree, \"black\", \"darkred\", \"pink\");\n//\n//   // if (frequencyData[frequencyData.length/2] === 0){\n//   //   FRACTAL_TREE.draw(360, 600, 120, 0, 20, ctxTree, myTree, \"black\", \"darkred\", \"pink\");\n//   //   ctxTree.clearRect(0,0, myTree.width, myTree.height);\n//   // } else if (frequencyData[frequencyData.length/2] > 50) {\n//   //   FRACTAL_TREE.draw(360, 600, 120, 0, 20, ctxTree, myTree, \"blue\", \"darkred\", \"pink\");\n//   //   ctxTree.clearRect(0,0, myTree.width, myTree.height);\n//   // } else if (frequencyData[frequencyData.length/2] < 50) {\n//   //   FRACTAL_TREE.draw(360, 600, 120, 0, 20, ctxTree, myTree, \"red\", \"darkred\", \"pink\");\n//   //   ctxTree.clearRect(0,0, myTree.width, myTree.height);\n//   // }\n//\n// }\n//\n// renderTree();\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/modal.js":
/*!**********************!*\
  !*** ./src/modal.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// \n// const closeButton = document.getElementsByClassName('close')[0];\n// const modal = document.getElementsByClassName('modal')[0];\n// const question = document.getElementsByClassName('help')[0];\n//\n// closeButton.addEventListener(\"click\", function(){\n//   modal.classList.add(\"closed\");\n//   audio.play();\n// });\n//\n//\n// question.addEventListener(\"click\", function() {\n//   modal.classList.remove(\"closed\");\n// });\n\n//# sourceURL=webpack:///./src/modal.js?");

/***/ }),

/***/ "./src/sun.js":
/*!********************!*\
  !*** ./src/sun.js ***!
  \********************/
/*! exports provided: drawSun */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawSun\", function() { return drawSun; });\nfunction drawSun(context, freqValue, freqSequence) {\n    let transparency;\n    let hue = 250;\n\n    let x = canvas.width - 200,\n        y = 200;\n    if (false) {} else {\n        transparency = 0.08;\n    }\n    context.beginPath();\n    context.arc(x - freqValue / 8, y - freqValue / 8, Math.abs(freqValue - 120) * 5, 0, 2 * Math.PI, false);\n    context.strokeStyle = 'hsla(' + hue + ', ' + 100 + '%,' + 40 + '%,' + transparency + ')';\n    context.fillStyle = \"hsla(\" + hue + \", 100%, 40%, .01)\";\n\n    context.fill();\n    context.lineWidth = 2;\n    context.stroke();\n}\n\n//# sourceURL=webpack:///./src/sun.js?");

/***/ }),

/***/ "./src/tree.js":
/*!*********************!*\
  !*** ./src/tree.js ***!
  \*********************/
/*! exports provided: drawTree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawTree\", function() { return drawTree; });\nfunction drawTree(startX, startY, len, angle, branchWidth, treeContext, canvasEl, branchColor, leafColor, shadowColor) {\n\n  treeContext.beginPath();\n  treeContext.save();\n\n  treeContext.lineWidth = branchWidth;\n  treeContext.strokeStyle = branchColor;\n  treeContext.fillStyle = leafColor;\n  treeContext.shadowBlur = 15;\n  treeContext.shadowColor = shadowColor;\n\n  treeContext.translate(startX, startY);\n  treeContext.rotate(angle * Math.PI / 180);\n  treeContext.moveTo(0, 0);\n  treeContext.lineTo(0, -len);\n\n  treeContext.stroke();\n\n  if (len < 10) {\n    treeContext.beginPath();\n    treeContext.arc(0, -len, 10, 0, Math.PI / 2);\n    treeContext.fill();\n    treeContext.restore();\n    return;\n  }\n\n  drawTree(0, -len, len * 0.8, angle + 10, branchWidth * 0.8, treeContext, canvasEl);\n  drawTree(0, -len, len * 0.8, angle - 10, branchWidth * 0.8, treeContext, canvasEl);\n\n  treeContext.restore();\n}\n\n//# sourceURL=webpack:///./src/tree.js?");

/***/ })

/******/ });