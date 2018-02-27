var mover;
var img;
var movers = [];
var numberofobjects;

function playSound() {
  movers.push(new Mover());
  numberofobjects+=1;
  console.log("cantidad de caquitas: " + numberofobjects.toString())
  var audio;
  var num = random(1);
  if (num < 0.5) {
    audio = new Audio('fart0.mp3');
  }
  else if (num < 0.7) {
    audio = new Audio('fart1.mp3');
  }
  else if (num < 0.8){
    var audio = new Audio('fart2.mp3');
  }
  else if (num < 0.9){
    var audio = new Audio('fart3.mp3');
  }
  else{
    var audio = new Audio('fart4.mp3');
  }
  audio.play();
}

function preload() {
  img = loadImage('caquita.png');
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);

  img = loadImage('caquita.png');
  // Move the canvas so it's inside our <div id="sketch-holder">.
  canvas.parent('p5-container');

  if(/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent)){
    numberofobjects = 10;
  }
  else{
    numberofobjects = 30;
  }

  for (var i = 0; i < numberofobjects; i++) {
      movers[i] = new Mover();
  }

  bg = loadImage("background.jpg");
}

var draw = function() {
  clear();

  for (var i = 0; i < movers.length; i++) {
      movers[i].update();
      movers[i].checkEdges();
      movers[i].display();
  }
};

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Adapted from Dan Shiffman, natureofcode.com

var Mover = function() {
  this.position = createVector(random(windowWidth), random(windowHeight));
  this.velocity = createVector(7, 2);
};

Mover.prototype.update = function() {
  this.position.add(this.velocity);
};

Mover.prototype.display = function() {
  stroke(0);
  strokeWeight(2);
  fill(127);
  image(img, this.position.x, this.position.y, 100, 100);
  // ellipse(this.position.x, this.position.y, 48, 48);
};

Mover.prototype.checkEdges = function() {

  if (this.position.x > windowWidth) {
    this.position.x = 0;
  }
  else if (this.position.x < 0) {
    this.position.x = windowWidth;
  }

  if (this.position.y > windowHeight) {
    this.position.y = 0;
  }
  else if (this.position.y < 0) {
    this.position.y = windowHeight;
  }
};
