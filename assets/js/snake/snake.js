var scale = 20

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.body = []

    this.updatePosition = function() {
        this.x += this.xSpeed*scale
        this.x =  (this.x + canvas.width) % canvas.width
        this.y += this.ySpeed*scale
        this.y = (this.y + canvas.height) % canvas.height
    }

    this.updateBody = function() {
        if (this.x == f.x && this.y == f.y) {
            this.body.push(0)
            f.eaten = true
        }
        for (var i=this.body.length-2; i>=0; i--) {
            this.body[i+1] = this.body[i]
        }
        this.body[0] = {
            x: this.x,
            y: this.y
        }
    }


    this.updateSpeed = function(keyCode) {
        //this.direction = { 37: DIRECTION.UP, 38: DIRECTION.BOTTOM, 39: DIRECTION.LEFT, ... }[keyCode]
        switch (keyCode) {
            case 37:
                if (this.xSpeed != 1) {
                    this.xSpeed = -1
                    this.ySpeed = 0
                }
                break
            case 38:
                if (this.ySpeed != 1) {
                    this.xSpeed = 0
                    this.ySpeed = -1
                }
                break
            case 39:
                if (this.xSpeed != -1) {
                    this.xSpeed = 1
                    this.ySpeed = 0
                }
                break
            case 40:
                if (this.ySpeed != -1) {
                    this.xSpeed = 0
                    this.ySpeed = 1
                }
                break
            case 13: //// DEBUG:
                break;
        }
    }

    this.show = function() {
        context.fillStyle = 'white'
        context.fillRect(this.x, this.y, scale, scale)
        // context.fillStyle = 'black'
        // context.fillRect(this.body[i].x, this.y, scale, scale)

        for (var i=0; i<this.body.length; i++) {
            context.fillStyle = 'white'
            context.fillRect(this.body[i].x, this.body[i].y, scale, scale)
        }
    }
}
