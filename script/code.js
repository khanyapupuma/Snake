const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20; // Size of the snake and food
let snake = [{ x: 9 * box, y: 9 * box }];
let direction = null;
let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box
};
let score = 0;

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
  if (event.key === 'ArrowUp' && direction !== 'DOWN') {
    direction = 'UP';
  } else if (event.key === 'ArrowDown' && direction !== 'UP') {
    direction = 'DOWN';
  } else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') {
    direction = 'LEFT';
  } else if (event.key === 'ArrowRight' && direction !== 'LEFT') {
    direction = 'RIGHT';
  }
}

function drawBox(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, box, box);
  }
  
  function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
      drawBox(snake[i].x, snake[i].y, i === 0 ? 'purple' : 'rgb(181, 21, 181)');
    }
  }
  
  function drawFood() {
    drawBox(food.x, food.y, 'red');
  }

  function moveSnake() {
    let headX = snake[0].x;
    let headY = snake[0].y;
  
    if (direction === 'UP') headY -= box;
    if (direction === 'DOWN') headY += box;
    if (direction === 'LEFT') headX -= box;
    if (direction === 'RIGHT') headX += box;
  
    // Check if the snake eats the food
    if (headX === food.x && headY === food.y) {
      score++;
      food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
      };
    } else {
      snake.pop(); // Remove the tail if no food is eaten
    }
  
    // Add new head position
    let newHead = { x: headX, y: headY };
  
    // Game over conditions
    if (headX < 0 || headY < 0 || headX >= canvas.width || headY >= canvas.height || collision(newHead, snake)) {
      clearInterval(game);
      alert('Game Over');
    }
  
    snake.unshift(newHead);
  }
  
  function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
      if (head.x === array[i].x && head.y === array[i].y) {
        return true;
      }
    }
    return false;
  }

  function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
    moveSnake();
  
    // Display score
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, box, box);
  }
  
  let game = setInterval(drawGame, 100);
  
  function moveSnake() {
    let headX = snake[0].x;
    let headY = snake[0].y;
  
    // Change the position of the head based on the direction
    if (direction === 'UP') headY -= box;
    if (direction === 'DOWN') headY += box;
    if (direction === 'LEFT') headX -= box;
    if (direction === 'RIGHT') headX += box;
  
    // Wrap the snake around if it hits the canvas borders
    if (headX < 0) headX = canvas.width - box; // Left border to right
    if (headX >= canvas.width) headX = 0;      // Right border to left
    if (headY < 0) headY = canvas.height - box; // Top border to bottom
    if (headY >= canvas.height) headY = 0;      // Bottom border to top
  
    // Check if the snake eats the food
    if (headX === food.x && headY === food.y) {
      score++;
      food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
      };
    } else {
      snake.pop(); // Remove the tail if no food is eaten
    }
  
    // Add new head position
    let newHead = { x: headX, y: headY };
  
    // Check for collisions with itself
    if (collision(newHead, snake)) {
      clearInterval(game);
      alert('Game Over');
    }
  
    snake.unshift(newHead);
  }
  
  const restartPageButton = document.getElementById('restartPageButton');

  // Restart page button event handler
restartPageButton.addEventListener('click', () => {
    window.location.reload(); 
  });
