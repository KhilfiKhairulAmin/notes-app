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
    handler: function (argv) {
        notes.addNote(argv.title, argv.content)
    }
})

// List all notes
yargs.command({
    command: 'list',
    describe: 'List out all notes',
    handler: () => {
        notes.listNotes()
    }
})

// Read a note
yargs.command({
    command: 'read',
    describe: 'Display a note',
    handler: () => {
        console.log(chalk.greenBright('Loading...\n'))
        console.log(chalk.bold('Your note\n'), getNotes())
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
    handler: (argv) => {
        notes.removeNote(argv.title)
    }
})

yargs.parse()
