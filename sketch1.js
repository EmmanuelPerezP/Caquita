var mover;
var img;
var movers = [];
var numberofobjects;
var text;
var poopCounter;

function preload() {
  img = loadImage('caquita.png');
}

function playSound() {

  poopCounter+=1;
  text.textContent = poopCounter.toString();

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
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  console.log("width" + window.innerWidth.toString());
  console.log(window.innerHeight);
  var canvas = createCanvas(window.innerWidth, window.innerHeight);

  // Move the canvas so it's inside our <div id="sketch-holder">.
  canvas.parent('p5-container');

  poopCounter = 0;
  numberofobjects = 10;
  text = document.getElementById('text');

  for (var i = 0; i < numberofobjects; i++) {
      movers[i] = new Mover();
  }
};

var draw = function() {
  background('#f4c946');
  for (var i = 0; i < movers.length; i++) {
      movers[i].update();
      movers[i].checkEdges();
      movers[i].display();
  }
};


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
  image(img, this.position.x, this.position.y, 100, 100);
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
