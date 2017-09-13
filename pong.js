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
  this.score = 0;
  this.speed = 15;
}

Paddle.prototype.move = function(dy) {
  if(this.y + dy > 0 && this.y + this.height + dy < canvas.height) {
    this.y += dy;
  }
};

Paddle.prototype.render = function() {
  c.fillStyle = 'white';
  c.fillRect(this.x, this.y, this.width, this.height);
  c.fillText(player.score, 25, 40);
  c.fillText(computer.score, 575, 40);
};

// the ball
function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 10;
  this.x_speed = 2;
  this.y_speed = -2;

  this.resetPostion = function() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
  };

  this.resetSpeed = function() {
    this.x_speed = 2;
    this.y_speed = -2;
  }

  this.reset = function() {
    this.resetPostion();
    this.resetSpeed();
  };
}

Ball.prototype.move = function() {
  this.x += this.x_speed;
  this.y += this.y_speed;
 
  if (this.y - 5 < 0) { //hitting top wall
      this.y_speed = -this.y_speed;

  } else if (this.y + 5 > canvas.height) { //hitting bottom wall
      this.y_speed = -this.y_speed;
  }

  function checkCollision(paddle, axis) {
    var widthheight = axis ==  "x" ? "width" : "height";
    var rectPos = paddle[axis] + paddle[widthheight] / 2;
    return Math.abs(ball[axis] - rectPos);
  };

  var playerX = checkCollision(player, "x");
  var playerY = checkCollision(player, "y");

  var computerX = checkCollision(computer, "x");
  var computerY = checkCollision(computer, "y");

  if(playerX < (player.width/2 + ball.radius) && playerY < (player.height/2 + ball.radius)) {
    this.x_speed = -this.x_speed;
  } else if (computerX < (computer.width / 2 + ball.radius) && computerY < (computer.height / 2 + ball.radius)) { 
    this.x_speed = -this.x_speed;
  }
};

Ball.prototype.render = function() {
  c.beginPath();
  c.fillStyle = 'white';
  c.arc(this.x, this.y, this.radius, 0 , Math.PI * 2, false)
  c.fill();
};

Ball.prototype.update = function(player, computer) {
  // trying to reset the ball
  if (this.x < 0) {
    computer.score++;
    this.reset();
  }
  else if (this.x > canvas.width) {
    player.score++;
    this.reset();
  }
};

var player = new Paddle(50, 100, 10, 100);
var computer = new Paddle(550, 110, 10, 100);

computer.update = function(ball) {
  var ball_y_position = ball.y;
  var diff = -((computer.y + (computer.height / 2)) - ball_y_position);

  if (diff < 0) {
      diff = -2;
  }
  else if (diff > 0) {
      diff = 2;
  }
  // sets the difficulty, eventually want to randomize
  computer.move(diff * 0.5);
};

var ball = new Ball(canvas.width / 2, canvas.height / 2);

// press key event listener
function addKeyEvent() {
  window.addEventListener('keydown', keyPress, true);
}

// players key press movement
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

  update();
  render();
  animate(step);
};

var render = function() {
  player.render();
  computer.render();
  ball.render();
  ball.move(); 
};

var update = function() {
  computer.update(ball);
  ball.update(player,computer);
};

window.onload = function() {
  addKeyEvent();
  step();
};
