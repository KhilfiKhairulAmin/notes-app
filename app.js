const fs = require('fs')

const dataBuffer = fs.readFileSync('data.json').toString()
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)

data.name = "iNFiENiTE"
data.planet = "MyEarth"
data.age = 18

const updatedData = JSON.stringify(data)
fs.writeFileSync('data.json', updatedData)