
// var foodFlag = false

function Food() {
    this.x = Math.floor(Math.random()*(canvas.width/scale - 1)) * scale
    this.y = Math.floor(Math.random()*(canvas.height/scale - 1)) * scale
    this.eaten = false

    this.generate = function() {
        if (!this.eaten)
            return
        this.x = Math.floor(Math.random()*(canvas.width/scale - 1)) * scale
        this.y = Math.floor(Math.random()*(canvas.height/scale - 1)) * scale
        this.eaten = false
    }

    this.show = function() {
        context.fillStyle = 'rgb(255,99,71)'
        context.fillRect(this.x, this.y, scale, scale)
    }
}
