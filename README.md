# Profound Sound

## About

Profound Sound is a music visualization app that allows users to watch, listen and dance along to visual representations of This Must Be The Place by The Talking Heads. The app was originally inspired by an Animal Collective concert experience in NYC, and the song choice was made in honor of two good friends who were recently married.  

The app is powered by vanilla JavaScript DOM manipulation of an HTML canvas element, along with Web Audio API and D3 interaction which allow the translation of waves of sound into visual displays.  

Access the live site [here](http://andrewlidong.xyz/profound_sound/
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
1. Introductory modal containing app instructions
2. Recursive rendering of a binary tree
3. Extraction of frequency data into unsigned integers
4. Dynamic re-rendering of a canvas sphere
5. Dynamic re-rendering of an SVG chart by integrating D3 API

### Introductory modal containing app instructions

Since an HTML canvas does not provide mouse coordinates when a user clicks over it, I dynamically calculated canvas coordinates from full window MouseEvent coordinates via the `getCanvasCoords` function. This translates the window's mouse coordinates into canvas coordinates which are agnostic to screen size and window scroll. The result is a precise drawing experience for the user even if s/he scrolls or changes screen size during a drawing session.

```
// from canvas.js

getCanvasCoords(){
  const canvasPosition = this.canvasElement.getBoundingClientRect();
  const canvasLeft = canvasPosition.left + window.scrollX;
  const canvasTop = canvasPosition.top + window.scrollY;
  return [canvasLeft, canvasTop];
}
```

### Recursive rendering of a binary tree

Since an HTML canvas begins its coordinate system with (0,0) at the top left corner, I translated the canvas grid into a Cartesian plane. When a user clicks anywhere on the canvas, the distance from the origin is calculated as well as a set of symmetric point(s) which will be simultaneously drawn.

In the case of radial symmetry, the first user click calculates an initial angle `theta` about the origin. This, in conjunction with the `radialOrder` -- or number of symmetry slices -- is used to determine equidistantly-spaced points in radians whose canvas coordinates are calculated using trigonometry.

```
// from canvas.js

computeRadialSymPairs(e){
  const symmetricPairSet = [];

  const xDistance = (e.pageX - this.canvasLeftSide() - this.axisPoint[0]);
  const yDistance = -(e.pageY - this.canvasTop() - this.axisPoint[1]);
  const pythagoreanSum = Math.pow(xDistance, 2) + Math.pow(yDistance, 2);
  const radius =  Math.sqrt(pythagoreanSum);

  let theta;
  if (xDistance >= 0 && yDistance >= 0){
    theta = Math.atan(yDistance / xDistance);
  } else if (xDistance <= 0 && yDistance >= 0){
    theta = Math.PI - Math.asin(yDistance / radius);
  } else if (xDistance <= 0 && yDistance <= 0){
    theta = Math.PI + Math.atan(yDistance / xDistance);
  } else if (xDistance >= 0 && yDistance <= 0){
    theta = (2 * Math.PI) - Math.acos(xDistance / radius);
  }

  const sliceSizeRadians = (2 * Math.PI) / this.radialOrder;

  const thetaPrimes = [];
  //note: thetaPrimes will not include theta since firstPair coordinates are already known from the user's click
  for (let i = 1; i <= this.radialOrder; i ++){
    thetaPrimes.push(theta + (sliceSizeRadians * i));
  }

  thetaPrimes.forEach(angle => {
    const canvasX = (radius * Math.cos(angle)) + this.axisPoint[0];
    const canvasY = this.axisPoint[1] - (radius * Math.sin(angle));
    symmetricPairSet.push([canvasX, canvasY]);
  });
  return { symmetricPairSet };
}

```

### Extraction of frequency data into unsigned integers


### Dynamic re-rendering of a canvas sphere


### Dynamic re-rendering of an SVG chart by integrating D3 API

## Future Features
In the future, I plan to add the following features:

* User may add their own songs
* User may adjust the colors of the tree, the sun and the grass


<!-- ## JavaScript Project Proposal: Profound Sound

### Background

Profound Sound is a music visualization app that integrates web audio api and D3 in order to translate waves of sound into visual displays.  

### Functionality & MVP  

With Profound Sound, users will be able to:

- [ ] Navigate a functional website
- [ ] Play and pause songs
- [ ] Play their own mp3s
- [ ] Adjust volume
- [ ] See a scalable vector graphic display of the music
- [ ] Change color of display

In addition, this project will include:

- [ ] An About modal describing the background and rules of the app
- [ ] A production README

### Wireframes

This app will consist of a single screen with display board, music player, and nav links to the Github, my LinkedIn, my Personal Site and the About modal.  Music controls will include Play, Pause, Forward and Back buttons as well as sliders to control the volume.  On the bottom, three clickable shapes will be used to toggle between the types of visual displays available.  On the left, there will be a display of the song name and artist, as well as the option to change the color.  

### Architecture and Technologies

This project will be implemented with the following technologies:

- `JavaScript ES6` for integrating various apis,
- `Web Audio API` for extracting data relating to the waveform of the sound of an html5 audio element
- `D3` to display scalable vector graphics dependent on the data extracted from `Web Audio API`
- `HTML5` for formatting
- `CSS3` for styling components
- `Webpack4` to bundle js files

In addition to the entry file, there will be several scripts involved in this project:

`music_player.js`: this script will handle the logic for playing and pausing music, skipping forward and backward, and adjusting volume.  

`graphic_display.js`: this script will handle the logic for translating data from web audio to scalable vector graphic displays.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Web Audio` and `D3` installed. Write a basic entry file. Learn the basics of `Web Audio` and `D3`.  Goals for the day:

- Get a green bundle with `Webpack`
- Have a music player up and running
- Figure out where my audio files will be coming from.  

**Day 2**: Dedicate this day to learning the `Web Audio` API.  First, figure out how to get an array of numbers that corresponds to waveforms of sound from an HTML5 audio element.  Then, figure out how to update that array as the music changes and normalize it so that the screen will redraw depending on the updated array.  If time allows, figure out how to use `D3` to draw and redraw graphics based on the data extracted from `Web Audio`.  Goals for the day:

- Complete the `music_player.js` module and all components including sound bar, fast forward and backward, play and pause.  
- Start work on `graphic_display.js`

**Day 3**: Complete the backend logic for displaying visual information.  Goals for the day:

- Finish MVPs (no styling)

**Day 4**: Install the controls for the user to interact with the app.  Style the frontend, making it polished and professional.  Goals for the day:

- Polish controls for game speed, stop, start, reset, and shape type
- Have a styled `HTML`, nice looking controls and title
- If time: include alternative SVG displays


### Bonus features

There are many directions Profound Sound could go.  Some anticipated updates are:

- [ ] Add additional SVG display options
- [ ] Allow playing of music from foreign MP3s
- [ ] Integration with a 3rd party application such as Spotify or SoundCloud
- [ ] Integration with user microphone
- [ ] Adjusting sensitivity tuning for SVG displays -->
