var canvas = document.getElementById('pongCanvas');
var c = canvas.getContext('2d'); // canvas object

// canvas background
c.fillStyle = 'black';
c.fillRect(0, 0, canvas.width, canvas.height);


// paddles
function Paddle(x, y) {
  this.x = x;
  this.y = y;
  this.render = function() {
    c.fillStyle = 'white';
    c.fillRect(this.x, this.y, 10, 100);
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


var player = new Paddle(50, 100);
var computer = new Paddle(550, 110);
var ball = new Ball(500, 250);

var render = function(){
    player.render();
    computer.render();
    ball.render(); 
};


window.onload = function(){
    render();
};