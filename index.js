const offset = {
    x: -285,
    y: -1100
}
const step = 3
const mapWidth = 89

var dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight];
const canvas = document.querySelector('canvas')
canvas.width = dimension[0]
canvas.height = dimension[1]

const context = canvas.getContext('2d')

const collisionMap = []
for (let i =0; i < collisions.length; i += mapWidth) {
    collisionMap.push(collisions.slice(i, mapWidth+i))
}

const boundaries = []
collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol != 0) {
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                },
                val: symbol
            }))
        }
    })
})

const mapImage = new Image()
mapImage.src = './img/map.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'

const foregroundImage = new Image()
foregroundImage.src = './img/foreground.png'

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: mapImage,
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage,
})

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 768 / 8, 
        y: canvas.height / 2 - 192 / 2
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    ratio: 4,
    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage
    }
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const movables = [background, ...boundaries, foreground]

function rectangularCollision({rectangle1, rectangle2}) {
    let xMargin = 1
    let yMargin = 2
    if (rectangle2.val === 1138) {
        xMargin = 2
        yMargin = 4
    }
    return(
        rectangle1.position.x + rectangle1.width / xMargin - 6 >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width / xMargin - 6 && 
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height / yMargin &&
        rectangle1.position.y + rectangle1.height / yMargin >= rectangle2.position.y
    )
}

function animate() {
    window.requestAnimationFrame(animate)

    background.draw()
    boundaries.forEach((boundary) => {
        boundary.draw()
    })
    player.draw()
    foreground.draw()

    let moving = true
    player.moving = false
    if (keys.w.pressed && lastkey === 'w') {
        player.moving = true
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + step
                        },
                        val: boundary.val
                    }
                })
            ) {
                moving = false
                break
            }
        }

        if (moving) {
            movables.forEach((movable) => {
                movable.position.y += step
            })
        }
    }
    else if (keys.a.pressed  && lastkey === 'a') {
        player.moving = true
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + step,
                            y:boundary.position.y 
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }
        
        if (moving) {
            movables.forEach((movable) => {
                movable.position.x += step
            })
        }
    }
    else if (keys.s.pressed && lastkey === 's') {
        player.moving = true
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y:boundary.position.y - step
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }
        
        if (moving) {
            movables.forEach((movable) => {
                movable.position.y -= step
            })
        }
    }
    else if (keys.d.pressed && lastkey === 'd') {
        player.moving = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - step,
                            y:boundary.position.y
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }
        
        if (moving) {
            movables.forEach((movable) => {
                movable.position.x -= step
            })
        }
    }
}

animate()

let lastkey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastkey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastkey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastkey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastkey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
    player.frames.val = 0
})