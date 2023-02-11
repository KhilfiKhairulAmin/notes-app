const { readFileSync } = require('fs')

function getNotes() {
    return readFileSync('./notes.txt', 'utf-8')
}

module.exports = {getNotes}