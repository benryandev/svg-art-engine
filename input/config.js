const fs = require("fs")

const rarity = [
    { key: "", val: "Common"},
    { key: "_u", val: "Uncommon"},
    { key: "_r", val: "Rare"},
    { key: "_m", val: "Mythic"},
]

const addRarity = (_str) => {
    let itemRarity;
    rarity.forEach(r => {
        if (_str.includes(r.key)) {
            itemRarity = r.val
        }
    })
    return itemRarity
}

const cleanName = (_str) => {
    let name = _str.slice(0, -4)
    rarity.forEach(r => {
        name = name.replace(r.key, "")
    })
    return name
}

const getElements = (path) => {
    return fs
        .readdirSync(path)
        .filter(item => !/(^|\/)\.[^\/\.]/g.test(item))
        .map((i, index) => {
            return {
                id: index + 1,
                name: cleanName(i),
                fileName: i,
                filePath: path+i,
                rarity: addRarity(i)
            }
        })
}

const layers = [
    {
        id: 1,
        name: "background",
        location: {
            male: {
                white: `${__dirname}/background`,
                black: `${__dirname}/background`,
                brown: `${__dirname}/background`,
                pale: `${__dirname}/background`,
            },
            female: {
                white: `${__dirname}/background`,
                black: `${__dirname}/background`,
                brown: `${__dirname}/background`,
                pale: `${__dirname}/background`,
            }
        },
        elements: {
            male: {
                white: getElements(`${__dirname}/background/`),
                black: getElements(`${__dirname}/background/`),
                brown: getElements(`${__dirname}/background/`),
                pale: getElements(`${__dirname}/background/`),
            },
            female: {
                white: getElements(`${__dirname}/background/`),
                black: getElements(`${__dirname}/background/`),
                brown: getElements(`${__dirname}/background/`),
                pale: getElements(`${__dirname}/background/`),
            }
        },
        required: true
    },
    {
        id: 2,
        name: "wings",
        location: {
            male: {
                white: `${__dirname}/male/white/wings`,
                black: `${__dirname}/male/black/wings`,
                brown: `${__dirname}/male/brown/wings`,
                pale: `${__dirname}/male/pale/wings`,
            },
            female: {
                white: `${__dirname}/female/white/wings`,
                black: `${__dirname}/female/black/wings`,
                brown: `${__dirname}/female/brown/wings`,
                pale: `${__dirname}/female/pale/wings`,
            }
        },
        elements: {
            male: {
                white: getElements(`${__dirname}/male/white/wings/`),
                black: getElements(`${__dirname}/male/black/wings/`),
                brown: getElements(`${__dirname}/male/brown/wings/`),
                pale: getElements(`${__dirname}/male/pale/wings/`),
            },
            female: {
                white: getElements(`${__dirname}/female/white/wings/`),
                black: getElements(`${__dirname}/female/black/wings/`),
                brown: getElements(`${__dirname}/female/brown/wings/`),
                pale: getElements(`${__dirname}/female/pale/wings/`),
            }
        },
        required: false,
        chance: 40
    },
    {
        id: 3,
        name: "legs",
        location: {
            male: {
                white: `${__dirname}/male/white/legs`,
                black: `${__dirname}/male/black/legs`,
                brown: `${__dirname}/male/brown/legs`,
                pale: `${__dirname}/male/pale/legs`,
            },
            female: {
                white: `${__dirname}/female/white/legs`,
                black: `${__dirname}/female/black/legs`,
                brown: `${__dirname}/female/brown/legs`,
                pale: `${__dirname}/female/pale/legs`,
            }
        },
        elements: {
            male: {
                white: getElements(`${__dirname}/male/white/legs/`),
                black: getElements(`${__dirname}/male/black/legs/`),
                brown: getElements(`${__dirname}/male/brown/legs/`),
                pale: getElements(`${__dirname}/male/pale/legs/`),
            },
            female: {
                white: getElements(`${__dirname}/female/white/legs/`),
                black: getElements(`${__dirname}/female/black/legs/`),
                brown: getElements(`${__dirname}/female/brown/legs/`),
                pale: getElements(`${__dirname}/female/pale/legs/`),
            }
        },
        required: true
    },
    {
        id: 4,
        name: "upperBody",
        location: {
            male: {
                white: `${__dirname}/male/white/upperBody`,
                black: `${__dirname}/male/black/upperBody`,
                brown: `${__dirname}/male/brown/upperBody`,
                pale: `${__dirname}/male/pale/upperBody`,
            },
            female: {
                white: `${__dirname}/female/white/upperBody`,
                black: `${__dirname}/female/black/upperBody`,
                brown: `${__dirname}/female/brown/upperBody`,
                pale: `${__dirname}/female/pale/upperBody`,
            }
        },
        elements: {
            male: {
                white: getElements(`${__dirname}/male/white/upperBody/`),
                black: getElements(`${__dirname}/male/black/upperBody/`),
                brown: getElements(`${__dirname}/male/brown/upperBody/`),
                pale: getElements(`${__dirname}/male/pale/upperBody/`),
            },
            female: {
                white: getElements(`${__dirname}/female/white/upperBody/`),
                black: getElements(`${__dirname}/female/black/upperBody/`),
                brown: getElements(`${__dirname}/female/brown/upperBody/`),
                pale: getElements(`${__dirname}/female/pale/upperBody/`),
            }
        },
        required: true
    },
    {
        id: 5,
        name: "headFormat",
        location: {
            male: {
                white: `${__dirname}/male/white/head/format`,
                black: `${__dirname}/male/black/head/format`,
                brown: `${__dirname}/male/brown/head/format`,
                pale: `${__dirname}/male/pale/head/format`,
            },
            female: {
                white: `${__dirname}/female/white/head/format`,
                black: `${__dirname}/female/black/head/format`,
                brown: `${__dirname}/female/brown/head/format`,
                pale: `${__dirname}/female/pale/head/format`,
            }
        },
        elements: {
            male: {
                white: getElements(`${__dirname}/male/white/head/format/`),
                black: getElements(`${__dirname}/male/black/head/format/`),
                brown: getElements(`${__dirname}/male/brown/head/format/`),
                pale: getElements(`${__dirname}/male/pale/head/format/`),
            },
            female: {
                white: getElements(`${__dirname}/female/white/head/format/`),
                black: getElements(`${__dirname}/female/black/head/format/`),
                brown: getElements(`${__dirname}/female/brown/head/format/`),
                pale: getElements(`${__dirname}/female/pale/head/format/`),
            }
        },
        required: true
    },
    {
        id: 6,
        name: "beard",
        location: {
            male: {
                white: `${__dirname}/male/white/head/beard`,
                black: `${__dirname}/male/black/head/beard`,
                brown: `${__dirname}/male/brown/head/beard`,
                pale: `${__dirname}/male/pale/head/beard`,
            },
            female: {
                white: `${__dirname}/female/white/head/beard`,
                black: `${__dirname}/female/black/head/beard`,
                brown: `${__dirname}/female/brown/head/beard`,
                pale: `${__dirname}/female/pale/head/beard`,
            }
        },
        elements: {
            male: {
                white: getElements(`${__dirname}/male/white/head/beard/`),
                black: getElements(`${__dirname}/male/black/head/beard/`),
                brown: getElements(`${__dirname}/male/brown/head/beard/`),
                pale: getElements(`${__dirname}/male/pale/head/beard/`),
            },
            female: {
                white: getElements(`${__dirname}/female/white/head/beard/`),
                black: getElements(`${__dirname}/female/black/head/beard/`),
                brown: getElements(`${__dirname}/female/brown/head/beard/`),
                pale: getElements(`${__dirname}/female/pale/head/beard/`),
            }
        },
        required: false,
        chance: 10
    },
    {
        id: 7,
        name: "eyes",
        location: {
            male: {
                white: `${__dirname}/male/white/head/eyes`,
                black: `${__dirname}/male/black/head/eyes`,
                brown: `${__dirname}/male/brown/head/eyes`,
                pale: `${__dirname}/male/pale/head/eyes`,
            },
            female: {
                white: `${__dirname}/female/white/head/eyes`,
                black: `${__dirname}/female/black/head/eyes`,
                brown: `${__dirname}/female/brown/head/eyes`,
                pale: `${__dirname}/female/pale/head/eyes`,
            }
        },
        elements: {
            male: {
                white: getElements(`${__dirname}/male/white/head/eyes/`),
                black: getElements(`${__dirname}/male/black/head/eyes/`),
                brown: getElements(`${__dirname}/male/brown/head/eyes/`),
                pale: getElements(`${__dirname}/male/pale/head/eyes/`),
            },
            female: {
                white: getElements(`${__dirname}/female/white/head/eyes/`),
                black: getElements(`${__dirname}/female/black/head/eyes/`),
                brown: getElements(`${__dirname}/female/brown/head/eyes/`),
                pale: getElements(`${__dirname}/female/pale/head/eyes/`),
            }
        },
        required: true
    },
    {
        id: 8,
        name: "accessories",
        location: {
            male: {
                white: `${__dirname}/male/white/head/accessories`,
                black: `${__dirname}/male/black/head/accessories`,
                brown: `${__dirname}/male/brown/head/accessories`,
                pale: `${__dirname}/male/pale/head/accessories`,
            },
            female: {
                white: `${__dirname}/female/white/head/accessories`,
                black: `${__dirname}/female/black/head/accessories`,
                brown: `${__dirname}/female/brown/head/accessories`,
                pale: `${__dirname}/female/pale/head/accessories`,
            }
        },
        elements: {
            male: {
                white: getElements(`${__dirname}/male/white/head/accessories/`),
                black: getElements(`${__dirname}/male/black/head/accessories/`),
                brown: getElements(`${__dirname}/male/brown/head/accessories/`),
                pale: getElements(`${__dirname}/male/pale/head/accessories/`),
            },
            female: {
                white: getElements(`${__dirname}/female/white/head/accessories/`),
                black: getElements(`${__dirname}/female/black/head/accessories/`),
                brown: getElements(`${__dirname}/female/brown/head/accessories/`),
                pale: getElements(`${__dirname}/female/pale/head/accessories/`),
            }
        },
        required: false,
        chance: 10
    },
    {
        id: 9,
        name: "hair",
        location: {
            male: {
                white: `${__dirname}/male/white/head/hair`,
                black: `${__dirname}/male/black/head/hair`,
                brown: `${__dirname}/male/brown/head/hair`,
                pale: `${__dirname}/male/pale/head/hair`,
            },
            female: {
                white: `${__dirname}/female/white/head/hair`,
                black: `${__dirname}/female/black/head/hair`,
                brown: `${__dirname}/female/brown/head/hair`,
                pale: `${__dirname}/female/pale/head/hair`,
            }
        },
        elements: {
            male: {
                white: getElements(`${__dirname}/male/white/head/hair/`),
                black: getElements(`${__dirname}/male/black/head/hair/`),
                brown: getElements(`${__dirname}/male/brown/head/hair/`),
                pale: getElements(`${__dirname}/male/pale/head/hair/`),
            },
            female: {
                white: getElements(`${__dirname}/female/white/head/hair/`),
                black: getElements(`${__dirname}/female/black/head/hair/`),
                brown: getElements(`${__dirname}/female/brown/head/hair/`),
                pale: getElements(`${__dirname}/female/pale/head/hair/`),
            }
        },
        required: false,
        chance: 80
    },
    {
        id: 10,
        name: "mouth",
        location: {
            male: {
                white: `${__dirname}/male/white/head/mouth`,
                black: `${__dirname}/male/black/head/mouth`,
                brown: `${__dirname}/male/brown/head/mouth`,
                pale: `${__dirname}/male/pale/head/mouth`,
            },
            female: {
                white: `${__dirname}/female/white/head/mouth`,
                black: `${__dirname}/female/black/head/mouth`,
                brown: `${__dirname}/female/brown/head/mouth`,
                pale: `${__dirname}/female/pale/head/mouth`,
            }
        },
        elements: {
            male: {
                white: getElements(`${__dirname}/male/white/head/mouth/`),
                black: getElements(`${__dirname}/male/black/head/mouth/`),
                brown: getElements(`${__dirname}/male/brown/head/mouth/`),
                pale: getElements(`${__dirname}/male/pale/head/mouth/`),
            },
            female: {
                white: getElements(`${__dirname}/female/white/head/mouth/`),
                black: getElements(`${__dirname}/female/black/head/mouth/`),
                brown: getElements(`${__dirname}/female/brown/head/mouth/`),
                pale: getElements(`${__dirname}/female/pale/head/mouth/`),
            }
        },
        required: true
    }
]


module.exports = { layers }