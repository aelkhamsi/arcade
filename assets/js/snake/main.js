
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

var s = new Snake()
var f = new Food()

document.addEventListener('keydown', function(e) {
    s.updateSpeed(e.keyCode)
})

function drawBackground() {
    context.fillStyle = 'rgb(34, 34, 34)'
    context.fillRect(0, 0, canvas.height, canvas.width)

    context.strokeStyle = 'rgb(0, 255, 255)'
    context.strokeRect(0, 0, canvas.height, canvas.width)
}

function draw() {
    drawBackground()

    s.updatePosition()
    s.updateBody()
    s.show()

    f.generate()
    f.show()
}

setInterval(draw, 50) //20 frame per second
