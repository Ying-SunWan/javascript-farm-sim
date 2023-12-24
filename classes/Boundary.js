class Boundary {
    static width = 48
    static height = 48

    constructor({position, val, image={}}) {
        this.position = position
        this.val = val
        this.image = image

        this.width = 48
        this.height = 48
    }

    draw() {
        context.drawImage(
            this.image.image, 
            (this.val % this.image.cols) * this.width, 
            Math.floor(this.val / this.image.cols) * this.height, 
            this.width, 
            this.height, 
            this.position.x,
            this.position.y,
            this.width, 
            this.height
        )
        // context.fillStyle = 'red'
        // context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
