const offset = {
    x: -285,
    y: -1350
}
const step = 5
const mapWidth = 89
const mapHeight = 51

var dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight];
const canvas = document.querySelector('canvas')
canvas.width = dimension[0]
canvas.height = dimension[1]

const context = canvas.getContext('2d')

// Boundary Maps

const collisionMap = []
const flowerMap = []
for (let i =0; i < mapHeight * mapWidth; i += mapWidth) {
    collisionMap.push(collisions.slice(i, mapWidth+i))
    flowerMap.push(flowers.slice(i, mapWidth+i))
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

const flowerImages = []
flowerMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol != 0) {
            flowerImages.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                },
                val: symbol - 2910,
                image: {
                    image: flowerImage,
                    rows: 15,
                    cols: 5
                }
            }))
        }
    })
})

// Create Sprites 

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

// Create Keys

wKey = new MoveKey({
    step: {
        x: 0,
        y: step
    },
    sprite: player.sprites.up
})
aKey = new MoveKey({
    step: {
        x: step,
        y: 0
    },
    sprite: player.sprites.left
})
sKey = new MoveKey({
    step: {
        x: 0,
        y: -1 * step
    },
    sprite: player.sprites.down
})
dKey = new MoveKey({
    step: {
        x: -1 * step,
        y: 0
    },
    sprite: player.sprites.right
})

// Animate

const movables = [background, ...boundaries, foreground, ...flowerImages]
function animate() {
    window.requestAnimationFrame(animate)
    
    background.draw()
    player.draw()
    foreground.draw()

    let numBoundaries = 0 
    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (boundary.val === 1026) numBoundaries++
        if (player.position.y <= boundary.position.y) {
            flowerImages.slice(i - numBoundaries + 1).forEach(flower => flower.draw())
        }
    }

    player.moving = false
    if (wKey.pressed && lastkey === 'w') {
        if (wKey.move()) {
            movables.forEach((movable) => {
                movable.position.y += step
            })
        }
    }
    else if (aKey.pressed  && lastkey === 'a') {
        if (aKey.move()) {
            movables.forEach((movable) => {
                movable.position.x += step
            })
        }
    }
    else if (sKey.pressed && lastkey === 's') {
        if (sKey.move()) {
            movables.forEach((movable) => {
                movable.position.y -= step
            })
        }
    }
    else if (dKey.pressed && lastkey === 'd') {
        if (dKey.move()) {
            movables.forEach((movable) => {
                movable.position.x -= step
            })
        }
    }
}

animate()