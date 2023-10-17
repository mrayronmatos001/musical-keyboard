const audios = document.querySelectorAll('audio')
const keys = document.querySelectorAll('.key')
const audiolist = {}
const keylist = {}

const functions = {
    playNote: e => {
        const audioKeyCode = functions.subfunctions.getKeyCode(e)
        const key = keylist[audioKeyCode]

        if(!key) {
            return;
        }

        functions.subfunctions.addPlayingClass(key).playAudio(audioKeyCode)
    },
    removePlayNote: e => {
        e.target.classList.remove("playing")
    },
    subfunctions: {
        getKeyCode: (e) => {
            return e.type === "keydown" ? e.keyCode : e.target.dataset.key
        },
        addPlayingClass: function(key) {
            key.classList.add('playing')
            return this
        },
        playAudio: function(audioKeyCode) {
            audiolist[audioKeyCode].currentTime = 0
            audiolist[audioKeyCode].play()
            return this
        }
    }
}

const setStoreObjects = () => {
    keys.forEach(key => keylist[key.dataset.key] = key)
    audios.forEach(audio => audiolist[audio.dataset.key] = audio)

}

const setListeners = () => {
    keys.forEach(key => {
        key.onclick = functions.playNote
        key.ontransitionend = functions.removePlayNote
    })

    window.onkeydown = functions.playNote
}

const init = () => {
    setStoreObjects()
    setListeners()
}

init()