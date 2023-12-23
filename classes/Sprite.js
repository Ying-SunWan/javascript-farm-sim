class Sprite {
    constructor({ 
        position, 
        velocity, 
        image, 
        frames = {max: 1},
        ratio = 1,
        sprites = {}
    }) {
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}
        this.ratio = ratio

        this.image.onload = () => {
            this.width = this.image.width / (this.frames.max * this.ratio)
            this.height = this.image.height / this.ratio
        }

        this.moving = false
        this.sprites = sprites
    }

    draw() {
        context.drawImage(
            this.image, 
            this.frames.val * (this.image.width / this.frames.max), 
            0,
            this.image.width / this.frames.max, 
            this.image.height, 
            this.position.x,
            this.position.y,
            this.image.width / (this.frames.max * this.ratio), 
            this.image.height / this.ratio, 
        )

        if (!this.moving) return 

        if (this.frames.max > 1) {
            this.frames.elapsed++
        }
        if (this.frames.elapsed % 5 == 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
    }
}