class Boundary {
    static width = 48
    static height = 48

    constructor({position, val}) {
        this.position = position
        this.width = 48
        this.height = 48
        this.val = val
    }

    draw() {
        context.fillStyle = 'rgba(0, 0, 0, 0)'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
