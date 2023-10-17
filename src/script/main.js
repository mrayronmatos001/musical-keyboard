const audios = document.querySelectorAll('audio')
const lis = document.querySelectorAll('li')
const keys = document.querySelectorAll('.key')
const audiolist = {}
const keylist = {}
const eye = {
    eye: document.querySelector('.eye'),
    wrapper: document.querySelector('.eye .eye__wrapper'),
    icon: document.querySelector('.eye i')
}

const functions = {
    playNote: e => {
        const audioKeyCode = functions.subfunctions.getKeyCode(e)
        const key = keylist[audioKeyCode]

        if(!key) {
            return;
        }

        functions.subfunctions.addPlayingClass(key).playAudio(audioKeyCode)
    },
    toggleKeboardKeys: () => {
        eye.icon.classList.toggle('fa-eye')
        eye.icon.classList.toggle('fa-eye-slash')
        lis.forEach(li => li.classList.toggle('slash'))
    },
    subfunctions: {
        getKeyCode: (e) => {
            return e.type === "keydown" ? e.keyCode : e.target.dataset.key
        },
        addPlayingClass: function(key) {
            key.classList.add('playing')
            return this
        },
        removePlayingClass: e => {
            e.target.classList.remove("playing")
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
    window.onkeydown = functions.playNote
    keys.forEach(key => {
        key.onclick = functions.playNote
        key.ontransitionend = functions.subfunctions.removePlayingClass
    })
    eye.wrapper.onclick = functions.toggleKeboardKeys

}

const init = () => {
    setStoreObjects()
    setListeners()
}

init()