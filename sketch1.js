var mover;
var img;
var movers = [];
var numberofobjects;
var contador;
var poopCounter;

// Clock doc
// http://countdownjs.org/readme.html
var timerId;

function start(){
  var date = new Date();
  var date2 = new Date();
  date.setSeconds(date.getSeconds() + 10)

  timerId = countdown(
      date,
      (ts) => {

        clock.textContent = ts.seconds + ":" + ts.milliseconds;
        console.log(ts.toString());
        if(ts.value > 0){
          window.clearInterval(timerId);
          clock.textContent = "0:000"
        }
      },
      countdown.MINUTES|countdown.SECONDS|countdown.MILLISECONDS
  );
}

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
  var canvas = createCanvas(window.innerWidth, window.innerHeight);

  // Move the canvas so it's inside our <div id="sketch-holder">.
  canvas.parent('p5-container');

  // poop counter for the html tag
  poopCounter = 0;
  // clock
  clock = document.getElementById('clock');
  // html tag
  contador = document.getElementById('counter');
  // number of poop/move objects
  numberofobjects = 3;

  for (var i = 0; i < numberofobjects; i++) {
      movers[i] = new Mover(random(1, 20));
  }
};

var draw = function() {
  clear();
  //background('#f4c946');


  for (var i = 0; i < movers.length; i++) {
      var wind = createVector(0.01, 0);
      var gravity = createVector(0, 0.1*movers[i].mass);
      movers[i].applyWind();
      movers[i].applyForce(gravity);
      movers[i].update();
      movers[i].checkEdges();
      movers[i].display();
  }
};

function updateCounter(){
  poopCounter+=1;
  contador.textContent = poopCounter.toString();
}

function showScoreTable(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         // Typical action to be performed when the document is ready:
         console.log(xhttp.responseText);
      }
  };
  xhttp.open("GET", "http://127.0.0.1:8000/api/", true);
  xhttp.send();
}

function playSound() {
  /*
  playSound updates the counter and makes a new Poop
  */

  updateCounter();
  movers.push(new Mover(random(1, 20)));
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

var Mover = function(m) {
  this.mass = m;
  this.size = m*16;
  this.wind = createVector(random(-0.1,0.1),0);
  this.position = createVector((window.innerWidth/2)-(m*16/2), (window.innerHeight/2)-(m*16/2));
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
};

// Simulates Newton's second law
// Receive a force, divide by mass, add to acceleration
Mover.prototype.applyForce = function(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
};

Mover.prototype.applyWind = function(){
  this.applyForce(this.wind);
};

Mover.prototype.update = function() {
  // Simulates Motion 101 from the vectors tutorial
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  // Now we mak.we sure to clear acceleration each time
  this.acceleration.mult(0);
};

Mover.prototype.display = function() {
  /*
  stroke(0);
  strokeWeight(2);
  fill(127);
  */
  // poop image
  image(img, this.position.x, this.position.y, this.mass*16, this.mass*16);
  //ellipse(this.position.x, this.position.y, 48, 48);
};

Mover.prototype.checkEdges = function() {

  if (this.position.x+this.size > window.innerWidth) {
    this.position.x = window.innerWidth-this.size;
    this.velocity.x *= -1;
  }
  else if (this.position.x < 0) {
    this.velocity.x *= -1;
    this.position.x = 0;
  }

  if ((this.position.y+this.size) > window.innerHeight) {
    this.position.y = window.innerHeight-this.size;
    this.velocity.y *= -1;
  }
  else if (this.position.y < 0) {
    this.position.y = window.innerHeight;
  }
};
