const { layers } = require("./input/config")

let features = []
let rarities = []

const getFeatures = () => {
    layers.map((layer) => {
        let elements = []

        // Getting the features from one of them, doesn't matter which one
        layer.elements.male.white.map((element) => {
            elements.push({ [element.name]: 0 })
        })

        let cleanElements = Object.assign({}, ...elements)

        features.push({ [layer.name]: cleanElements })
    })
}

const getRarities = () => {
    layers.map((layer) => {
        rarities.push({
            [layer.name]: {
                common: 0,
                uncommon: 0,
                rare: 0,
                mythic: 0
            }
        })
    })
}

getFeatures()
getRarities()

let cleanFeatures = Object.assign({}, ...features)
let cleanRarities = Object.assign({}, ...rarities)

let stats = {
    numberOfCharacters: 0,
    males: 0,
    females: 0,
    whites: 0,
    blacks: 0,
    numberOfBalds: 0,
    numberOfBearded: 0,
    numberOfCharsWAccessories: 0,
    features: cleanFeatures,
    rarities: cleanRarities
}

module.exports = { stats }