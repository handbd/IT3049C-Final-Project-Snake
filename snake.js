var canvas = document.getElementById("snakeCanvas");
var context = canvas.getContext("2d");
var score = document.getElementById("score");
var startBtn = document.getElementById("startBtn");
var pauseBtn = document.getElementById("pauseBtn");
var resumeBtn = document.getElementById("resumeBtn");
var fruit = document.getElementById("fruit");
var virus = document.getElementById("virus");
var snakeHeadX, snakeHeadY, fruitX, fruitY, virusX, virusY, tail, totalTail, directionVar, direction, previousDir;
var speed=1, xSpeed, ySpeed;
const scale = 20;
var rows = canvas.height / scale;
var columns = canvas.width / scale;
var min = scale / 10; //for min coordinate of fruit
var max = rows - min; //for max 
var gameInterval,  //interval after which screen will be updated
    virusInterval, //interval after which virus position will be updated
    intervalDuration=150, //starting screen updation interval
    minDuration=75; //minimum screen updation interval
var playing, gameStarted;
var boundaryCollision;
var tail0;
startBtn.addEventListener("click", startGame);

//reset the variables to starting value
function reset() {
    clearInterval(gameInterval);
    clearInterval(virusInterval);
    intervalDuration=150, 
    minDuration=75;
    tail = [];
    totalTail = 0;
    directionVar = "Right";
    direction = "Right";
    previousDir = "Right";
    xSpeed = scale * speed;
    ySpeed = 0;
    snakeHeadX = 0;
    snakeHeadY = 0;
    pauseBtn.style.backgroundColor="#fff";
    resumeBtn.style.backgroundColor="#fff";
    playing=false, gameStarted=false;
    boundaryCollision=false;
}

function startGame() {
    reset();
    gameStarted=true;
    playing=true;
    fruitPosition();
    virusPosition();
    main();
}

function pauseGame() {
    window.clearInterval(gameInterval);
    window.clearInterval(virusInterval);
    pauseBtn.style.backgroundColor="#ccc";
    resumeBtn.style.backgroundColor="#fff";
    playing=false;
}

function resumeGame()
{
    main();
    pauseBtn.style.backgroundColor="#fff";
    resumeBtn.style.backgroundColor="#ccc";
    playing=true;
}

//EventListener to check which arrow key is pressed
window.addEventListener("keydown", pressedKey);

function pressedKey() {
    if(event.keyCode===32 && gameStarted) {
        if(playing) {
            pauseGame();
        }
        else{
            resumeGame();
        }
    }
    else {
        previousDir = direction;
        directionVar = event.key.replace("Arrow", "");
        changeDirection();
    }
}