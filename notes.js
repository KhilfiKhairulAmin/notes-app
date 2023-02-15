const { readFileSync, writeFileSync } = require('fs')
const chalk = require('chalk')

/**
 * List out note titles based on the `filter` if given. If not given, list out *all* note titles.
 * @param {String} filter Condition of title
 * @returns 
 */
const listNotes = (filter) => {
    let notes = loadNotes(), emptyMsg = 'You don\'t have a note yet currently. Create one by using the command `add`'
    // Filter list if `filter` is provided
    if (filter !== undefined) {
        notes = filterNotes(notes, filter)
        emptyMsg = 'No similar notes found.'
    }

    if (notes.length === 0) {
        console.log(chalk.yellow(emptyMsg));
        return
    }

    console.log(chalk.bold.blueBright('\nYour Notes List'));
    notes.forEach((note) => console.log('>', note.title))
}

/**
 * Filter note titles based on the given `filter`
 * @param {Array} notes Notes
 * @param {String} filter Condition of title
 * @returns {Array} Filtered Notes
 */
const filterNotes = (notes, filter) => {
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
            const note = notes[mid]
            console.log(chalk.bold.blue('\n>', note.title));
            console.log(note.body);
            console.log('\n');
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
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}