const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{x: 150, y: 150}, {x: 140, y: 150}, {x: 130, y: 150}];
let dx = 10;
let dy = 0;
let foodX;
let foodY;
let score = 0;

function clearCanvas() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(foodX, foodY, 10, 10);
}

function drawSnake() {
  snake.forEach(part => {
    ctx.fillStyle = 'limegreen';
    ctx.fillRect(part.x, part.y, 10, 10);
  });
}

function advanceSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);

  if (head.x === foodX && head.y === foodY) {
    score += 10;
    createFood();
  } else {
    snake.pop();
  }
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function randomTen(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function createFood() {
  foodX = randomTen(0, canvas.width - 10);
  foodY = randomTen(0, canvas.height - 10);
  snake.forEach(function isFoodOnSnake(part) {
    if (part.x === foodX && part.y === foodY) createFood();
  });
}

function drawScore() {
  ctx.fillStyle = 'white';
  ctx.font = '24px Arial';
  ctx.fillText(`Score: ${score}`, 20, canvas.height - 20);
}

function showGameOverScreen() {
  document.getElementById('finalScore').textContent = score.toString();
  document.getElementById('gameOverScreen').style.display = 'flex';
}

function hideGameOverScreen() {
  document.getElementById('gameOverScreen').style.display = 'none';
}

function restartGame() {
  snake = [{x: 150, y: 150}, {x: 140, y: 150}, {x: 130, y: 150}];
  dx = 10;
  dy = 0;
  createFood();
  score = 0;
  hideGameOverScreen();
  main();
}

document.getElementById('restartGameBtn').addEventListener('click', restartGame);

function main() {
  if (didGameEnd()) {
    showGameOverScreen();
    return;
  }

  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();
    drawScore();
    main();
  }, 100);
}


function didGameEnd() {
  for (let i = 4; i < snake.length; i++) {
    const collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if (collided) return true;
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > canvas.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > canvas.height - 10;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

createFood();
document.addEventListener('keydown', changeDirection);
main();
