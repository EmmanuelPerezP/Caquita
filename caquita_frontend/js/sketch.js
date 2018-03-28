var mover;
var img;
var movers = [];
var numberofobjects;
var contador;
var poopCounter;

function preload() {
  img = loadImage('caquita.png');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {

  // we do pixelDensity(1) to avoid lag in mobile, because p5 when rendering
  // the canvas multplies windowidth * pixelDensity so it makes it to render
  // alot more pixels than it has to.
  // lookup https://github.com/processing/p5.js/blob/eb4c09094750ae03608a2c39aa72e85b59ed4252/src/core/p5.Renderer.js
  // ctrl + f 'pixelDensity'
  pixelDensity(1);

  // 60 to 50 for better performance?
  frameRate(50);

  // logs to debug sounds
  console.log("width" + window.innerWidth.toString());
  console.log(window.innerHeight);
  var canvas = createCanvas(window.innerWidth, window.innerHeight);

  // Move the canvas so it's inside our <div id="sketch-holder">.
  canvas.parent('p5-container');

  // number of poop/move objects
  poopCounter = 0;
  numberofobjects = 0;
  contador = document.getElementById('counter');

  for (var i = 0; i < numberofobjects; i++) {
      movers[i] = new Mover();
  }
};

var draw = function() {
  clear();
  //background('#f4c946');
  for (var i = 0; i < movers.length; i++) {
      movers[i].update();
      movers[i].checkEdges();
      movers[i].display();
  }
};

function updateCounter(){
  poopCounter+=1;
  contador.textContent = poopCounter.toString();
}

function playSound() {
  /*
  playSound updates the counter and makes a new Poop
  */

  updateCounter();
  movers.push(new Mover());
  numberofobjects += 1;
  console.log("cantidad de caquitas: " + numberofobjects.toString())
  var audio;
  var num = random(1);
  if (num < 0.5) {
    audio0 = new Audio('fart0.mp3');
    audio0.play();
    console.log("audio0");
  }
  else if (num < 0.8){
    audio2 = new Audio('fart2.mp3');
    audio2.play();
    console.log("audio2");
  }
  else if (num < 0.9){
    audio3 = new Audio('fart3.mp3');
    audio3.play();
    console.log("audio3");
  }
  else{
    audio4 = new Audio('fart4.mp3');
    audio4.play();
    console.log("audio4");
  }
}

// Adapted from Dan Shiffman, natureofcode.com

var Mover = function() {
  this.position = createVector(random(window.innerWidth), random(window.innerHeight));
  this.velocity = createVector(7, 2);
};

Mover.prototype.update = function() {
  this.position.add(this.velocity);
};

Mover.prototype.display = function() {
  /*
  stroke(0);
  strokeWeight(2);
  fill(127);
  */
  // poop image
  image(img, this.position.x, this.position.y, 200, 200);
  //ellipse(this.position.x, this.position.y, 48, 48);
};

Mover.prototype.checkEdges = function() {

  if (this.position.x > window.innerWidth) {
    this.position.x = 0;
  }
  else if (this.position.x < 0) {
    this.position.x = window.innerWidth;
  }

  if (this.position.y > window.innerHeight) {
    this.position.y = 0;
  }
  else if (this.position.y < 0) {
    this.position.y = window.innerHeight;
  }
};
