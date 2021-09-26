"use strict";

const fs = require("fs");
const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);

const baseUri = "dropUriHere"

// read json data
let rawdata = fs.readFileSync(`${basePath}/output/json/metadata.json`);
let data = JSON.parse(rawdata);

data.forEach((item) => {
  item.image = `ipfs://${baseUri}/${item.collectionID}.svg`;
  fs.writeFileSync(
    `${basePath}/output/json/${item.collectionID}.json`,
    JSON.stringify(item, null, 2)
  );
});

fs.writeFileSync(
  `${basePath}/output/json/metadata.json`,
  JSON.stringify(data, null, 2)
);

console.log(`Updated baseUri for images to ===> ${baseUri}`);