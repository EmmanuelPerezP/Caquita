var mover;
var img;

function preload() {
  img = loadImage('caquita.png');
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);

  // Move the canvas so it's inside our <div id="sketch-holder">.
  canvas.parent('p5-container');
  mover = new Mover();
  mover1 = new Mover();
  mover2 = new Mover();
  mover3 = new Mover();
  mover4 = new Mover();
}

var draw = function() {
  background(255, 255, 255);

  mover.update();
  mover.checkEdges();
  mover.display();
};

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Adapted from Dan Shiffman, natureofcode.com

var Mover = function() {
  this.position = createVector(random(width), random(height));
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

  if (this.position.x > width) {
    this.position.x = 0;
  }
  else if (this.position.x < 0) {
    this.position.x = width;
  }

  if (this.position.y > height) {
    this.position.y = 0;
  }
  else if (this.position.y < 0) {
    this.position.y = height;
  }
};
