const spaElements = document.querySelectorAll('[data-container]:not([data-container=""])');
const spalist = {}

const changeURLHash = (e, name, element) => {
    e.preventDefault()
    const path = element => location.href = location.origin + location.pathname + "#" + element.getAttribute('class')
    const chooseSpaElement = {
        login: path,
        create: path,
        buy: path
    }
    chooseSpaElement[name](element)
}

const popstateSet = {

    subfunctions: {}
}

const setStoreObjects = () => {
    spaElements.forEach(element => spalist[element.getAttribute('class')] = element)
}

const setListeners = () => {
    Object.entries(spalist).map(([ name, element ]) => element.onclick = e => changeURLHash(e, name, element))
}

const init = () => {
    setStoreObjects()
    setListeners()
}

export default {
    init
}