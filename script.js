const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const gameContainer = document.getElementById('gameContainer');
const containerWidth = gameContainer.offsetWidth;
const containerHeight = gameContainer.offsetHeight;

let playerPosition = containerWidth / 2 - 15;
let obstaclePosition = -30;
let obstacleSpeed = 2;
let isGameOver = false;

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft' && playerPosition > 0) {
        playerPosition -= 10;
    } else if (event.key === 'ArrowRight' && playerPosition < containerWidth - 30) {
        playerPosition += 10;
    }
    player.style.left = playerPosition + 'px';
});

function moveObstacle() {
    if (isGameOver) return;
    obstaclePosition += obstacleSpeed;
    if (obstaclePosition > containerHeight) {
        obstaclePosition = -30;
        obstacle.style.left = Math.random() * (containerWidth - 30) + 'px';
    }
    obstacle.style.top = obstaclePosition + 'px';
    checkCollision();
    requestAnimationFrame(moveObstacle);
}

function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    if (playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.top < obstacleRect.bottom &&
        playerRect.bottom > obstacleRect.top) {
        isGameOver = true;
        alert('Game Over');
    }
}

moveObstacle();
