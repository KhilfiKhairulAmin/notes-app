const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')

// Add new note
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
            alias: 't'
        },
        content: {
            describe: 'Note content',
            demandOption: true,
            type: 'string',
            alias: 'c'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.content)
    }
})

// List all notes
yargs.command({
    command: 'list',
    describe: 'List out all notes',
    builder: {
        filter: {
            describe: 'Filter the notes listed',
            type: 'string'
        }
    },
    handler(argv) {
        notes.listNotes(argv.filter)
    }
})

// Read a note
yargs.command({
    command: 'read',
    describe: 'Display a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
            alias: 't'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

// Remove a note
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
            alias: 't'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

yargs.parse()
