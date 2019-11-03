var canvas = document.getElementById("canvas")
var context = canvas.getContext('2d')


var bird = new Image()
var fly = new Audio();
var scor = new Audio();

bird.src = "images/bird.png"
fly.src = "assets/sounds/fly.mp3";
scor.src = "assets/sounds/score.mp3";


/////
// Some variables
/////
var bX = 30
var bY = 250
var birdWidth = 20
var birdHeight = 20
var speedX = 3
var speedY = 4
var accY = 0.30
var gap = 120
var minSouthPipeHeight = 40
var pipes = []
pipes[0] = {
    x : canvas.width,
    y : 0,
    height : Math.floor(Math.random() * (canvas.height - gap - minSouthPipeHeight))
}
var pipeWidth = 80
var score = 0

/////
// Draw functions
/////
function drawBird() {
    //Trying to rotate the bird...ugghhhh
    // context.save()
    // context.translate(canvas.width/2, canvas.height/2)
    // context.rotate(-(Math.PI / 180) * 45)
    context.drawImage(bird, bX, bY)
    // context.restore(    )
}

function drawBackground() {
    context.fillStyle = "rgb(135, 206, 250)"
    context.fillRect(0, 0, canvas.width, canvas.height)
}

function applyForces() {
    speedY += accY;
    bY += speedY;
}

document.addEventListener('keydown', function() {
    speedY = -4.7*1.5
    fly.play()
})

function generatePipe() {
    let pipe = {
        x : canvas.width,
        y : 0,
        height : Math.floor(Math.random() * (canvas.height - gap - minSouthPipeHeight))
    }
    pipes.push(pipe)
}

function drawPipes() {
    for(var i = 0; i<pipes.length; i++) {
        if (pipes[i].x < -pipeWidth) {
            pipes.splice(i, 1)
        } else {
            pipes[i].x -= speedX
            if (pipes[i].x >= canvas.height/2 && pipes[i].x < canvas.height/2 + speedX) {
                generatePipe()
            }
            //North pipe
            context.fillStyle = "rgb(85, 60, 42)"
            context.fillRect(pipes[i].x, pipes[i].y, pipeWidth, pipes[i].height)
            //South pipe
            context.fillStyle = "rgb(85, 60, 42)"
            context.fillRect(pipes[i].x, pipes[i].height + gap, pipeWidth, canvas.height - (pipes[i].height + gap))
        }
    }
}

function detectCollisions() {
    if (bY < 0 || bY >= canvas.height ) {
        score = 0
        location.reload()
    }
    for(var i = 0; i<pipes.length; i++) {
        if ( bX + birdWidth >= pipes[i].x && bX <= pipes[i].x + pipeWidth) {
            if (bY <= pipes[i].height || bY + birdHeight >= pipes[i].height + gap) {
                score = 0
                location.reload()
            }
        }
    }
}


function displayScore() {
    for(var i = 0; i<pipes.length; i++) {
        if (bX >= pipes[i].x + pipeWidth && bX < pipes[i].x + pipeWidth + speedX) {
            score++
            scor.play()
        }
    }
    context.fillStyle = "#fff"
    context.fillText("Score : " + score, canvas.width/2 - 30, 30)
}

function draw() {
    drawBackground()
    drawBird()
    drawPipes()
    applyForces()
    detectCollisions()
    displayScore()

    window.requestAnimationFrame(draw)
}

draw()
