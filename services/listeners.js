let lastkey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            wKey.pressed = true
            lastkey = 'w'
            break
        case 'a':
            aKey.pressed = true
            lastkey = 'a'
            break
        case 's':
            sKey.pressed = true
            lastkey = 's'
            break
        case 'd':
            dKey.pressed = true
            lastkey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            wKey.pressed = false
            break
        case 'a':
            aKey.pressed = false
            break
        case 's':
            sKey.pressed = false
            break
        case 'd':
            dKey.pressed = false
            break
    }
    player.frames.val = 0
})