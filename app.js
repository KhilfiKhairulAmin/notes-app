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
            type: 'string'
        },
        description: {
            describe: 'Note content',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.description)
    }
})

// List all notes
yargs.command({
    command: 'list',
    describe: 'List out all notes',
    handler: () => {
        console.log(chalk.greenBright('Loading...'));
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
    handler: () => {
        console.log(chalk.redBright('Removing note...'));
    }
})

yargs.parse()
