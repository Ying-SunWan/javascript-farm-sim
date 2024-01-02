class Key {
    constructor() {
        this.pressed = false
    }
}

class MoveKey extends Key {
    constructor({step, sprite}) {
        super()
        this.step = step
        this.sprite = sprite
    }

    rectangularCollision({rectangle1, rectangle2}) {
        let xMargin = 1
        let yMargin = 2

        if (rectangle2.val === softBoundsIndicator) {
            xMargin = 2
            yMargin = 4
        }
        else if (rectangle2.val === bridgeIndicator) {
            xMargin = 1
            yMargin = 10
        }

        return(
            rectangle1.position.x + rectangle1.width / xMargin - 6 >= rectangle2.position.x && 
            rectangle1.position.x <= rectangle2.position.x + rectangle2.width / xMargin - 6 && 
            rectangle1.position.y <= rectangle2.position.y + rectangle2.height / yMargin &&
            rectangle1.position.y + rectangle1.height / yMargin >= rectangle2.position.y
        )
    }

    move() {
        let moving = true
        player.moving = true
        player.image = this.sprite
        let numBoundaries = 0 

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]

            if (boundary.val === hardBoundsIndicator) numBoundaries++
            if (
                this.rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + this.step.x,
                            y: boundary.position.y + this.step.y
                        }
                    }
                })
            ) {
                moving = false
                break
            }

            // if (player.position.y <= boundary.position.y + this.step.y) {
            //     flowerImages.slice(i - numBoundaries).forEach(flower => flower.draw())
            // }
        }

        return moving
    }s
}