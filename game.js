const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;

let snake = [];
let dx = 0;
let dy = 0;
let food = {};
let difficulty = "easy";
let gameInterval;

function startGame(selectedDifficulty) {
  // Ocultar menú y mostrar canvas
  document.getElementById("menu").style.display = "none";
  canvas.style.display = "block";

  difficulty = selectedDifficulty;
  

  // Inicializar valores del juego
  snake = [{ x: 10 * box, y: 10 * box }];
  dx = box;
  dy = 0;

  food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
  };

  document.addEventListener("keydown", changeDirection);

  setupTouchControls();

  // Iniciar el loop del juego
  gameInterval = setInterval(update, 200
  );
}


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

function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function setupTouchControls() {
//   if (isMobile()) {
if (true) {
    document.getElementById('touch-controls').style.display = 'block';

    document.getElementById('up').addEventListener('click', () => {
      if (dy === 0) {
        dx = 0;
        dy = -box;
      }
    });

    document.getElementById('down').addEventListener('click', () => {
      if (dy === 0) {
        dx = 0;
        dy = box;
      }
    });

    document.getElementById('left').addEventListener('click', () => {
      if (dx === 0) {
        dx = -box;
        dy = 0;
      }
    });

    document.getElementById('right').addEventListener('click', () => {
      if (dx === 0) {
        dx = box;
        dy = 0;
      }
    });
  }
}

function update() {
  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };

  // Comportamiento diferente según dificultad
  if (difficulty === "easy") {
    // Teletransporte si se sale del canvas
    if (head.x >= canvas.width) head.x = 0;
    else if (head.x < 0) head.x = canvas.width - box;
    if (head.y >= canvas.height) head.y = 0;
    else if (head.y < 0) head.y = canvas.height - box;
  } else if (difficulty === "hard") {
    // Termina el juego si toca el borde
    if (
      head.x >= canvas.width || head.x < 0 ||
      head.y >= canvas.height || head.y < 0
    ) {
      clearInterval(gameInterval);
      alert("¡Perdiste! Tocaste el borde.");
      location.reload(); // reiniciar página
      return;
    }
  }

  // Comer comida
  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
  } else {
    snake.pop(); // si no comió, no crece
  }

  // Chocar consigo misma
  for (let part of snake) {
    if (head.x === part.x && head.y === part.y) {
      clearInterval(gameInterval);
      alert("¡Perdiste! Te chocaste contigo misma.");
      location.reload();
      return;
    }
  }

  snake.unshift(head);

  // Dibujar todo
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "lime";
  for (let part of snake) {
    ctx.fillRect(part.x, part.y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);
}
