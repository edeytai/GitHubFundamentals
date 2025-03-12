/**
 * Juego Breakout
 *
 * Emiliano Deyta
 * 2025-03-12
 */

"use strict";

// Dimensiones del canvas
const canvasWidth = 800;
const canvasHeight = 600;
let oldTime = 0;
let ctx;

// Objetos del juego
let ball;
let paddle;
let blocks = [];
let powerups = [];
let secondBall = null;         // Para el powerup de pelotas dobles
let doubleBallActive = false;  // Indica si el powerup de pelotas dobles está activo
let activePowerupMessage = ""; // Mensaje que se muestra al recoger un powerup
let activePowerupMessageTime = 0;

// Configuración de la grilla de bloques
const blockRows = 5;      // Número de renglones
const blockCols = 10;     // Número de columnas
const blockPadding = 5;
const blockOffsetTop = 50;
const blockOffsetLeft = 30;
let blockWidth = (canvasWidth - 2 * blockOffsetLeft - (blockCols - 1) * blockPadding) / blockCols;
const blockHeight = 20;

// Puntaje y vidas
let destroyedBlocks = 0;
let totalBlocks = blockRows * blockCols;
let lives = 3;
let gameState = "playing";  // Estados: "playing", "gameOver", "win"

// Configuración de la paleta
const basePaddleWidth = 100;
const paddleHeight = 20;
const paddleSpeed = 0.5;  // Velocidad en píxeles por ms

// Configuración de la pelota
const ballSize = 20;
const initialBallSpeed = new Vec(0.2, -0.2);

// Configuración del powerup (agrandar la paleta o pelotas dobles)
const POWERUP_DURATION = 10000;  // 10 segundos (solo para el powerup de agrandar la paleta)
const POWERUP_CHANCE = 0.2;        // 20% de probabilidad al destruir un bloque
const POWERUP_WIDTH = 20;
const POWERUP_HEIGHT = 20;
const POWERUP_FALL_SPEED = 0.1;    // Velocidad de caída en píxeles por ms
let paddlePowerupTime = 0;         // Tiempo restante del efecto en ms

// Clases adaptadas (estilo similar al Pong original)

class Ball extends GameObject {
    constructor(position, width, height, color, velocity) {
        super(position, width, height, color, "ball");
        this.velocity = velocity;
    }
    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }
}

class Paddle extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "paddle");
        this.velocity = new Vec(0, 0);
        this.originalWidth = width;
    }
    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));
        // Movimiento solo horizontal y limitar a los bordes del canvas
        if (this.position.x < 0) {
            this.position.x = 0;
        }
        if (this.position.x + this.width > canvasWidth) {
            this.position.x = canvasWidth - this.width;
        }
    }
}

class Powerup extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "powerup");
    }
    update(deltaTime) {
        // Caída vertical
        this.position = this.position.plus(new Vec(0, POWERUP_FALL_SPEED * deltaTime));
    }
}

// Función para crear los bloques según la configuración
function createBlocks() {
    blocks = [];
    for (let r = 0; r < blockRows; r++) {
        for (let c = 0; c < blockCols; c++) {
            let x = blockOffsetLeft + c * (blockWidth + blockPadding);
            let y = blockOffsetTop + r * (blockHeight + blockPadding);
            let colors = ["red", "orange", "yellow", "green", "blue"];
            let color = colors[r % colors.length];
            let block = new GameObject(new Vec(x, y), blockWidth, blockHeight, color, "block");
            blocks.push(block);
        }
    }
    totalBlocks = blocks.length;
}

// Reinicia la posición de la pelota y la paleta tras perder una vida
function resetBallAndPaddle() {
    ball.position = new Vec(canvasWidth / 2 - ballSize / 2, canvasHeight - paddleHeight - ballSize - 30);
    ball.velocity = initialBallSpeed;
    paddle.position = new Vec((canvasWidth - paddle.originalWidth) / 2, canvasHeight - paddleHeight - 10);
    secondBall = null;
    doubleBallActive = false;
}

function main() {
    const canvas = document.getElementById("canvas");
    if (!canvas) {
        console.error("Canvas no encontrado");
        return;
    }
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext("2d");

    // Inicializar la pelota y la paleta
    ball = new Ball(
        new Vec(canvasWidth / 2 - ballSize / 2, canvasHeight - paddleHeight - ballSize - 30),
        ballSize, ballSize, "red", initialBallSpeed
    );
    paddle = new Paddle(
        new Vec((canvasWidth - basePaddleWidth) / 2, canvasHeight - paddleHeight - 10),
        basePaddleWidth, paddleHeight, "blue"
    );
    createBlocks();
    createEventListeners();
    requestAnimationFrame(drawScene);
}

function createEventListeners() {
    window.addEventListener("keydown", (event) => {
        if (gameState !== "playing") return;
        if (event.key === "ArrowLeft") {
            paddle.velocity = new Vec(-paddleSpeed, 0);
        } else if (event.key === "ArrowRight") {
            paddle.velocity = new Vec(paddleSpeed, 0);
        }
    });
    window.addEventListener("keyup", (event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            paddle.velocity = new Vec(0, 0);
        }
    });
}

function drawScene(newTime) {
    if (!oldTime) {
        oldTime = newTime;
    }
    let deltaTime = newTime - oldTime;
    oldTime = newTime;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Dibujar los bloques
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].draw(ctx);
    }

    // Actualizar y dibujar powerups
    for (let i = powerups.length - 1; i >= 0; i--) {
        let powerup = powerups[i];
        powerup.update(deltaTime);
        powerup.draw(ctx);
        // Si el powerup se sale del canvas, se elimina
        if (powerup.position.y > canvasHeight) {
            powerups.splice(i, 1);
            continue;
        }
        // Colisión con la paleta: activa el efecto según el tipo
        if (boxOverLap(powerup, paddle)) {
            if (powerup.powerType === "doubleBall") {
                if (!doubleBallActive) {
                    // Crear la segunda pelota; este efecto dura hasta que se pierda una de las dos
                    secondBall = new Ball(ball.position.clone(), ballSize, ballSize, "red", ball.velocity.clone());
                    doubleBallActive = true;
                }
                activePowerupMessage = "Powerup: Double Ball";
            } else { // Asumimos powerup de agrandar la paleta ("paddle")
                paddle.width = paddle.originalWidth * 1.5;
                paddlePowerupTime = POWERUP_DURATION;
                activePowerupMessage = "Powerup: Paddle Enlarge";
            }
            activePowerupMessageTime = 3000;
            powerups.splice(i, 1);
        }
    }

    // Dibujar la pelota y la paleta
    ball.draw(ctx);
    paddle.draw(ctx);

    // Dibujar y actualizar la segunda pelota si existe
    if (secondBall !== null) {
        secondBall.draw(ctx);
        secondBall.update(deltaTime);
        if (secondBall.position.x < 0) {
            secondBall.position.x = 0;
            secondBall.velocity.x *= -1;
        }
        if (secondBall.position.x + secondBall.width > canvasWidth) {
            secondBall.position.x = canvasWidth - secondBall.width;
            secondBall.velocity.x *= -1;
        }
        if (secondBall.position.y < 0) {
            secondBall.position.y = 0;
            secondBall.velocity.y *= -1;
        }
        if (boxOverLap(secondBall, paddle) && secondBall.velocity.y > 0) {
            secondBall.position.y = paddle.position.y - secondBall.height;
            secondBall.velocity.y *= -1;
            let hitPos = (secondBall.position.x + secondBall.width / 2) - (paddle.position.x + paddle.width / 2);
            secondBall.velocity.x += hitPos * 0.001;
        }
        for (let i = 0; i < blocks.length; i++) {
            if (boxOverLap(secondBall, blocks[i])) {
                secondBall.velocity.y *= -1;
                if (Math.random() < POWERUP_CHANCE) {
                    let types = ["paddle", "doubleBall"];
                    let selectedType = types[Math.floor(Math.random() * types.length)];
                    let pColor = selectedType === "paddle" ? "purple" : "magenta";
                    let powerupPos = new Vec(
                        blocks[i].position.x + blocks[i].width / 2 - POWERUP_WIDTH / 2,
                        blocks[i].position.y
                    );
                    let powerup = new Powerup(powerupPos, POWERUP_WIDTH, POWERUP_HEIGHT, pColor);
                    powerup.powerType = selectedType;
                    powerups.push(powerup);
                }
                blocks.splice(i, 1);
                destroyedBlocks++;
                break;
            }
        }
        // Si la segunda pelota cae, se elimina sin quitar vida ni reiniciar
        if (secondBall.position.y > canvasHeight) {
            secondBall = null;
            doubleBallActive = false;
        }
    }

    // Mostrar contador de bloques destruidos y vidas
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Bloques destruidos: " + destroyedBlocks, 10, 20);
    ctx.fillText("Vidas: " + lives, canvasWidth - 80, 20);
    if (activePowerupMessageTime > 0) {
        activePowerupMessageTime -= deltaTime;
        ctx.fillText(activePowerupMessage, canvasWidth / 2 - 70, 40);
    }

    if (gameState === "playing") {
        ball.update(deltaTime);
        paddle.update(deltaTime);

        // Colisión con bordes laterales de la pelota
        if (ball.position.x < 0) {
            ball.position.x = 0;
            ball.velocity.x *= -1;
        }
        if (ball.position.x + ball.width > canvasWidth) {
            ball.position.x = canvasWidth - ball.width;
            ball.velocity.x *= -1;
        }
        // Colisión con el borde superior
        if (ball.position.y < 0) {
            ball.position.y = 0;
            ball.velocity.y *= -1;
        }

        // Colisión con la paleta (solo si la pelota se mueve hacia abajo)
        if (boxOverLap(ball, paddle) && ball.velocity.y > 0) {
            ball.position.y = paddle.position.y - ball.height;
            ball.velocity.y *= -1;
            let hitPos = (ball.position.x + ball.width / 2) - (paddle.position.x + paddle.width / 2);
            ball.velocity.x += hitPos * 0.001;
        }

        // Colisión de la pelota con los bloques
        for (let i = 0; i < blocks.length; i++) {
            if (boxOverLap(ball, blocks[i])) {
                ball.velocity.y *= -1;
                if (Math.random() < POWERUP_CHANCE) {
                    let types = ["paddle", "doubleBall"];
                    let selectedType = types[Math.floor(Math.random() * types.length)];
                    let pColor = selectedType === "paddle" ? "purple" : "magenta";
                    let powerupPos = new Vec(
                        blocks[i].position.x + blocks[i].width / 2 - POWERUP_WIDTH / 2,
                        blocks[i].position.y
                    );
                    let powerup = new Powerup(powerupPos, POWERUP_WIDTH, POWERUP_HEIGHT, pColor);
                    powerup.powerType = selectedType;
                    powerups.push(powerup);
                }
                blocks.splice(i, 1);
                destroyedBlocks++;
                break;
            }
        }

        // Si la pelota cae por el borde inferior:
        if (ball.position.y > canvasHeight) {
            if (doubleBallActive) {
                // Si hay doble pelota, se elimina la que cayó y se continúa con la otra
                ball = secondBall;
                secondBall = null;
                doubleBallActive = false;
            } else {
                lives--;
                if (lives > 0) {
                    resetBallAndPaddle();
                } else {
                    gameState = "gameOver";
                }
            }
        }

        // Actualizar efecto del powerup de la paleta (agrandar)
        if (paddlePowerupTime > 0) {
            paddlePowerupTime -= deltaTime;
            if (paddlePowerupTime <= 0) {
                paddle.width = paddle.originalWidth;
            }
        }

        // Condición de victoria
        if (destroyedBlocks === totalBlocks) {
            gameState = "win";
        }

        requestAnimationFrame(drawScene);
    } else {
        ctx.font = "40px Arial";
        ctx.fillStyle = "black";
        let message = gameState === "win" ? "¡Ganaste!" : "GAME OVER";
        ctx.fillText(message, canvasWidth / 2 - 100, canvasHeight / 2);
    }
}

window.onload = main;