const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;
const HOLE_SIZE = 100;
const NUM_HOLES_X = 5;
const NUM_HOLES_Y = 4;
const HOLE_MARGIN = 20;
const MOLE_SIZE = 80;

let holes = [];
let molePosition = { x: -1, y: -1 };
let score = 0;
let whacked = false;

// Create hole positions
for (let y = 0; y < NUM_HOLES_Y; y++) {
    for (let x = 0; x < NUM_HOLES_X; x++) {
        let posX = x * (HOLE_SIZE + HOLE_MARGIN) + HOLE_MARGIN;
        let posY = y * (HOLE_SIZE + HOLE_MARGIN) + HOLE_MARGIN;
        holes.push({ x: posX, y: posY });
    }
}

function getRandomHole() {
    return holes[Math.floor(Math.random() * holes.length)];
}

function drawHoles() {
    ctx.fillStyle = 'black';
    holes.forEach(pos => {
        ctx.beginPath();
        ctx.arc(pos.x + HOLE_SIZE / 2, pos.y + HOLE_SIZE / 2, HOLE_SIZE / 2, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawMole(position) {
    if (position.x !== -1 && position.y !== -1) {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(position.x + HOLE_SIZE / 2, position.y + HOLE_SIZE / 2, MOLE_SIZE / 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function updateScore() {
    document.getElementById('score').innerText = score;
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (
        molePosition.x <= mouseX &&
        mouseX <= molePosition.x + MOLE_SIZE &&
        molePosition.y <= mouseY &&
        mouseY <= molePosition.y + MOLE_SIZE
    ) {
        score++;
        whacked = true;
        updateScore();
    }
});

function gameLoop() {
    if (whacked || molePosition.x === -1) {
        molePosition = getRandomHole();
        whacked = false;
    }

    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    drawHoles();
    drawMole(molePosition);

    requestAnimationFrame(gameLoop);
}

gameLoop();
