class Dialogue {
    constructor({text, emote}) {
        this.text = text
        this.emote = emote
        this.talking = false
    }

    talk() {
        this.talking = true
        dialogueBox = new Sprite({
            position: {x: offset.x, y: offset.y},
            image: dialogueBoxImage,
        })

    }
}