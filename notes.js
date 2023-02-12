const { readFileSync, writeFileSync } = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    console.log('Loading your notes...');
}

const addNote = function (title, content) {
    // Load notes
    const notes = loadNotes()

    // Handle duplicate title and find insertion index to keep data sorted (ascending order)
    let l = 0, r = notes.length - 1
    while (l <= r) {
        const mid = Math.floor((l + r) / 2)

        if (notes[mid].title === title) {
            console.log(chalk.yellow('Note title already exists. Choose a new name for this one.'))
            return
        }

        else if (notes[mid].title > title) {
            r = mid - 1
        }
        else {
            l = mid + 1
        }
    }
    
    // Add new note at
    notes.splice(l, 0, {
        title,
        body: content
    })

    // Save note
    saveNotes(notes)

    console.log(chalk.greenBright('Note added successfully!'))
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON) 
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote
}