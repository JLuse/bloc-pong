var canvas = document.getElementById('pongCanvas');
var c = canvas.getContext('2d'); // canvas object

// canvas background
c.fillStyle = 'black';
c.fillRect(0, 0, canvas.width, canvas.height);



// paddles
function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.speed = 10;

  this.move = function(dy) {
    if(this.y + dy > 0 && this.y + this.height + dy < canvas.height) {
    this.y += dy;
    }
  };
  this.render = function() {
    c.fillStyle = 'white';
    c.fillRect(this.x, this.y, this.width, this.height);
  };
}

// the ball
function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.render = function() {
    c.beginPath();
    c.fillStyle = 'white';
    c.arc(350, 250, 10, 0 , Math.PI * 2, false)
    c.fill();
  };
}

var player = new Paddle(50, 100, 10, 100);
var computer = new Paddle(550, 110, 10, 100);
var ball = new Ball(500, 250);


function addKeyEvent() {
  window.addEventListener('keydown', keyPress, true);
}

function keyPress(direction) { 
  switch (direction.keyCode) {
    case 38:
      player.move(-player.speed);  // up
      break;
    case 40:
      player.move(player.speed); // down
      break;
  }
}

var animate = window.requestAnimationFrame || function(callback) { window.setTimeout(callback, 1000/60) };

var step = function() {
  c.clearRect(0,0,canvas.width,canvas.height);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  render();
  animate(step);
};

var render = function() {
  player.render();
  computer.render();
  ball.render(); 
};

window.onload = function() {
  addKeyEvent();
  step();
};