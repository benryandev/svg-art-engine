const fs = require("fs")
const { stats } = require("./stats")
const { layers } = require("./input/config")

let statistics = stats
let metadata = []

// This is assuming your SVG strings are ordered in lines (x=0;y=0 goes to x=1;y=0 and so on). If they're organized in columns, swap the y's for the x's.

let getIndexByCoordinates = (x, y) => {
    let pixelsInALine = 56
    if (x == 0) return (y * pixelsInALine)
    if (x != 0) return (y * pixelsInALine) + x
}

function readFilesAndModifyArray(_chosenType, _chosenColor) {
    return new Promise((resolve, reject) => {
        let completedArray = []

        let tempAttributes = {
            background: "",
            legs: "",
            upperBody: "",
            headFormat: "",
            eyes: "",
            mouth: "",
            hair: "",
            beard: "",
            accessories: ""
        }

        let tempMetadata = {
            name: `TestDude #${collectionNumber}`,
            description: "",
            image: "",
            collectionID: `${collectionNumber}`,
            attributes: []
        }


        layers.forEach(layer => {

            // Finding if the character is going to have a non-required feature or nah
            if (!layer.required) {
                let random = Math.random() * 100

                if (_chosenType == "female") {
                    if (layer.name == "hair") {random = random/4} //really hard for females to be bald
                    if (layer.name == "beard") {return} //No bearded females
                }

                if (random > layer.chance) return
            }

            //Choose a specific item based on rarity
            let allElements = layer.elements[_chosenType][_chosenColor]
            let raritiesInLayer = {
                common: 0,
                uncommon: 0,
                rare: 0,
                mythic: 0
            }

            allElements.map(element => {
                if (element.rarity == "Common") { raritiesInLayer.common++ }
                if (element.rarity == "Uncommon") { raritiesInLayer.uncommon++ }
                if (element.rarity == "Rare") { raritiesInLayer.rare++ }
                if (element.rarity == "Mythic") { raritiesInLayer.mythic++ }
            })


            // Make an array with the objects based on rarity and percentage.
            let elementsRarityArray = allElements.map(element => {
                if (element.rarity == "Common") return Array(Math.ceil(58 / raritiesInLayer.common)).fill(element)
                if (element.rarity == "Uncommon") return Array(Math.ceil(34 / raritiesInLayer.uncommon)).fill(element)
                if (element.rarity == "Rare") return Array(Math.ceil(7 / raritiesInLayer.rare)).fill(element)
                if (element.rarity == "Mythic") return Array(Math.ceil(1 / raritiesInLayer.mythic)).fill(element)
            }).flat()


            // Choosing the element 
            let chosenElement = elementsRarityArray[Math.floor(Math.random() * elementsRarityArray.length)]
            let chosenElementData = fs.readFileSync(chosenElement.filePath)

            // Add on to statistics
            statistics.numberOfCharacters = itemsInTheCollection
            statistics.features[layer.name][chosenElement.name]++
            if (chosenElement.rarity == "Common") statistics.rarities[layer.name].common++
            if (chosenElement.rarity == "Uncommon") statistics.rarities[layer.name].uncommon++
            if (chosenElement.rarity == "Rare") statistics.rarities[layer.name].rare++
            if (chosenElement.rarity == "Mythic") statistics.rarities[layer.name].mythic++
            
            tempAttributes[layer.name] = chosenElement.name

            function getCompletedArray(data) {
                var array = data.toString().split("\n");

                // Remove the first 2 and the last string that are equal in all SVG's
                array.shift()
                array.shift()
                array.pop()

                let splittedArray = []
                for (let i = 0; i < array.length; i++) {
                    splittedArray.push(array[i].split(" "))
                }

                for (let i = 0; i < splittedArray.length; i++) {
                    let x = splittedArray[i][1].split('"')[1]
                    let y = splittedArray[i][2].split('"')[1]
                    let fill = splittedArray[i][5].split('"')[1]

                    if (layer.name == "background") {
                        // Create the completedArray with the background description of the fills for all pixels

                        completedArray.push({ x: x, y: y, fill: fill })

                    } else {
                        // Replace the fills of specific pixels, layer by layer.

                        let indexToReplace = getIndexByCoordinates(parseInt(x), parseInt(y))
                        completedArray[indexToReplace].fill = fill
                    }
                }
            }
            getCompletedArray(chosenElementData)
        })
        let attributes = Object.entries(tempAttributes)
        tempMetadata.attributes.push({"trait_type": "Type", "value": _chosenType})
        attributes.forEach(attribute => tempMetadata.attributes.push({"trait_type": attribute[0], "value": attribute[1]}))
        metadata.push(tempMetadata)

        fs.writeFileSync(`./output/json/${collectionNumber}.json`, JSON.stringify(tempMetadata))

        resolve(completedArray)
    })
}

let writeSVG = (completedArray) => {

    let svg = ""
    svg += '<?xml version="1.0" encoding="UTF-8" ?>\n'
    svg += '<svg version="1.1" width="56" height="56" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">\n'

    for (pixel in completedArray) {
        svg += `<rect x="${completedArray[pixel].x}" y="${completedArray[pixel].y}" width="1" height="1" fill="${completedArray[pixel].fill}" />\n`
    }

    svg += '</svg>'

    let counter = collectionNumber

    fs.writeFile(`./output/images/${collectionNumber}.svg`, svg, (err) => {
        if (err) throw err;
        console.log(`SVG ${counter} written!`);
    });
}


const itemsInTheCollection = 300
let collectionNumber = 0

let createCollection = async () => {
    for (let i = 0; i < itemsInTheCollection; i++) {
        collectionNumber++

        let types = ["male", "female"]
        let colors = ["white", "black", "brown", "pale"]

        
        let chosenType = types[Math.floor(Math.random() * types.length)]
        let chosenColor = colors[Math.floor(Math.random() * colors.length)]

        await readFilesAndModifyArray(chosenType, chosenColor)
            .then(completedArray => writeSVG(completedArray))
            .catch(e => console.log(e))
    }

    //write simple html to check the output
    let html = ""

    html += '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta http-equiv="X-UA-Compatible" content="IE=edge">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Watcher</title>\n<link rel="stylesheet" href="./index.css">\n</head>\n<body>\n'

    const getOutput = (path) => {
        return fs
            .readdirSync(path)
            .filter(item => !/(^|\/)\.[^\/\.]/g.test(item))
            .map((i, index) => {
                return index
            })
    }

    let numberOfItems = getOutput("./output/images")
    for (item in numberOfItems) {
        html += `<img src="./output/images/${parseInt(item) + 1}.svg" alt="" class="item">\n`
    }

    html += '</body>\n</html>'

    fs.writeFile(`./index.html`, html, (err) => {
        if (err) throw err;
        console.log(`Watcher written!`);
    });

    //Write full metadata
    fs.writeFileSync(`./output/json/metadata.json`, JSON.stringify(metadata));
    

    //Write statistics
    statistics.numberOfBalds = itemsInTheCollection - Object.values(statistics.features.hair).reduce((a, b) => a + b, 0)
    statistics.numberOfBearded = Object.values(statistics.features.beard).reduce((a, b) => a + b, 0)
    statistics.numberOfCharsWAccessories = Object.values(statistics.features.accessories).reduce((a, b) => a + b, 0)

    fs.writeFileSync(`./statistics.json`, JSON.stringify(statistics));
    // console.log(statistics)

}

createCollection()

