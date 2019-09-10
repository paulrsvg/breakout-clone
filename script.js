/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

//Breakout Clone 

//ref canvas DOM element
var canvas = document.getElementById("canvas");
//ref var for the context
var ctx = canvas.getContext("2d");

//scoring points
var score = 0;

//size of ball for collision
var ballRadius = 20;
//coords to draw
var x = canvas.width/2;
var y = canvas.height-30;
//slope right?
var dx = 2;
var dy = -3; //change to -3 for faster/steeper, -1 for slower
//paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
//key input
var rightPressed = false;
var leftPressed = false;
//add the bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;


//add lives
var lives = 3;

//make bricks array
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}


//now some fxns
//event listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
//add mouse input
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}


const FONT_NAME = 'Press Start 2P';

// Show the start menu
function menu() {
  
  //erase();
  ctx.fillStyle = '#7cffcb';
  ctx.font = `30px "${FONT_NAME}"`;
  ctx.textAlign = 'center';
  ctx.fillText('* brkout *', canvas.width / 2, canvas.height / 4);
  ctx.font = `16px "${FONT_NAME}"`;
  ctx.fillStyle = '#ef798a';
  ctx.fillText('click to start', canvas.width / 2, canvas.height / 2);
  
  ctx.fillStyle = '#7cffcb';
  ctx.font = `12px "${FONT_NAME}"`;
  ctx.fillText('use the mouse or arrow keys to move', canvas.width / 2, (canvas.height / 4) * 3);
  // Start the game on a click
  canvas.addEventListener('click', startGame);
}

//start game fxn
function startGame() {
  // Stop listening for click events
  canvas.removeEventListener('click', startGame);
  // Kick off the draw loop
  draw();
  
}

// Clear the canvas
function erase() {
  ctx.fillStyle = '#ef798aF';
  ctx.fillRect(0, 0, 600, 400);
}





function renderText() {
//this here maybe wrong?
	  //let ctx = document.querySelector('canvas').getContext('2d');
    ctx.font = `20px "${FONT_NAME}"`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Game Over', 240, 100);
    
  
  
  
    canvas.addEventListener('click', startGame);
    //do start menu?
    //menu();
}


//font?



function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
            ctx.fillStyle = "red";
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                        
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = `16px "${FONT_NAME}"`; 
    ctx.fillStyle = "#7cffcb";
    //msg, x, y coords to display it
    ctx.fillText("SCORE: "+score, 80, 20);   
}

function drawLives() {
    ctx.font = `16px "${FONT_NAME}"`; 
    ctx.fillStyle = "#7cffcb";
    ctx.fillText("LIVES: "+lives, canvas.width-65, 20);
}


function drawBall() {
    ctx.beginPath();
    //default round ball
   /*  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill(); */
  
    
    
   //this is for a //neon green square ball 
    ctx.clearRect(0, 0, 500, 170);
    ctx.fillStyle = "#7cffcb";
    ctx.fillRect(x, y, 20, 20); 
      ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#7cffcb";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
               // ctx.fillStyle = "#7cffcb"; ef798a
               ctx.fillStyle = "#ef798a"; 
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();
    drawLives();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if(!lives) {
                alert("GAME OVER");
                renderText();
                document.location.reload();
                
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
            
            //renderText();
            
                  
          
          
        }
    }
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += dx;
    y += dy;
  
  //animation draw
  requestAnimationFrame(draw);
}

// Start the game
//document.fonts.load('10pt "Press Start 2P"').then(renderText);
//renderText();


document.fonts.load('10pt "Press Start 2P"').then(menu);

//menu();
// var interval = setInterval(draw, 10);
//canvas.focus();