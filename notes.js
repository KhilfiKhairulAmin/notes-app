const { readFileSync, writeFileSync } = require('fs')
const chalk = require('chalk')

/**
 * List all notes
 */
const listNotes = (filter) => {
    // List based on filter if filter is provided
    if (filter) {
        const notes = filterNotes(filter)

        if (notes.length === 0) {
            console.log(chalk.yellow('No similar notes found.'));
        }

        console.log(chalk.bold.blueBright('Similar Notes Found'));
        notes.forEach((note) => console.log('>', note.title))

        return
    }

    // List all if filter is not provided
    const notes = loadNotes()

    if (notes.length === 0) {
        console.log(chalk.yellow('You don\'t have a note yet currently. Create one by using the command `add`'));
        return
    }

    console.log(chalk.bold.blueBright('Your Notes List'));
    notes.forEach((note) => console.log('>', note.title))
}

const filterNotes = (filter) => {
    const searchValue = filter.trim().toLowerCase();
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchValue));
    return filteredNotes
}

/**
 * Add a new note and save it
 * @param {String} title Title of note
 * @param {String} content Content of note
 * @returns 
 */
const addNote = (title, content) => {
    // Load notes
    const notes = loadNotes()

    // Handle duplicate title and find insertion index to keep data sorted (in ascending order)
    // This is a binary search implementation, where two pointers are used. Go and search if you don't know what to imagine with this code
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

/**
 * Remove a note
 * @param {String} title Title of note
 * @returns 
 */
const removeNote = (title) => {
    const notes = loadNotes()

    // Search for title using binary search
    let l = 0, r = notes.length - 1
    while (l <= r) {
        const mid = Math.floor((l + r) / 2)

        if (notes[mid].title === title) {
            // Title is found, remove it
            console.log(chalk.red.bold(`Removing ${title}...`))
            notes.splice(mid, 1)
            saveNotes(notes)
            console.log(chalk.green('Note removed successfully!'))
            return
        }

        else if (notes[mid].title > title) {
            r = mid - 1
        }
        else {
            l = mid + 1
        }
    }

    // Title is not found
    console.log(chalk.yellow(`Note title does not exist. No note removed.`))
}

/**
 * Save notes in `notes.json` _(data source file)_
 * @param {Array} notes Notes array
 */
const saveNotes = (notes) => writeFileSync('notes.json', JSON.stringify(notes));

/**
 * Load notes from `notes.json` _(data source file)_
 * @returns {Array} Notes array
 */
const loadNotes = () => {
    try {
        const dataBuffer = readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON) 
    } catch (e) {
        return []
    }
}

/**
 * Load and print title and content of note
 * @param {String} title Title of note
 * @returns 
 */
const readNote = (title) => {
    const notes = loadNotes()

    let l = 0, r = notes.length
    while (l <= r) {
        const mid = Math.floor((l + r) / 2)

        if (notes[mid].title === title) {
            // Title is found, read the note
            console.log(chalk.green('Loading'));
            const note = notes[mid]
            console.log(chalk.bold.blue('\n>', note.title));
            console.log(note.body);
            return
        }

        else if (notes[mid].title > title) {
            r = mid - 1
        }
        else {
            l = mid + 1
        }
    }

    console.log(chalk.yellow('Note title does not exist.'));

    const similarNotes = filterNotes(title)

    if (similarNotes.length === 0) {
        return
    }

    console.log('Similar notes:');
    similarNotes.forEach((note) => console.log('>', note.title))

}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}