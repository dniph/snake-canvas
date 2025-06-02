const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;

let snake = [{ x: 10 * box, y: 10 * box }];

let dx = 0;
let dy = 0;

// Crear la comida en una posición aleatoria dentro del canvas (en múltiplos de box)
let food = {
  x: Math.floor(Math.random() * (canvas.width / box)) * box,
  y: Math.floor(Math.random() * (canvas.height / box)) * box
};

document.addEventListener("keydown", changeDirection);

function changeDirection(e) {
  if (e.key === "ArrowUp" && dy === 0) {
    dx = 0; dy = -box;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0; dy = box;
  } else if (e.key === "ArrowLeft" && dx === 0) {
    dx = -box; dy = 0;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = box; dy = 0;
  }
}

setInterval(update, 200);

function update() {
  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };

  // Si la serpiente come la comida...
  if (head.x === food.x && head.y === food.y) {
    // No quitar la última parte (crece)
    // Generar nueva comida en posición aleatoria
    food.x = Math.floor(Math.random() * (canvas.width / box)) * box;
    food.y = Math.floor(Math.random() * (canvas.height / box)) * box;
  } else {
    // Si no come, quitar la cola para que no crezca
    snake.pop();
  }

  snake.unshift(head);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar la serpiente
  ctx.fillStyle = "lime";
  for (let part of snake) {
    ctx.fillRect(part.x, part.y, box, box);
  }

  // Dibujar la comida
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);
}
