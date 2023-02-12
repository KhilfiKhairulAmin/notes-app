const { readFileSync, writeFileSync } = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    console.log('Loading your notes...');
}

const addNote = function (title, content) {
    // Load notes
    const notes = loadNotes()

    // Handle duplicate title
    
    
    // Add new note
    notes.push({
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