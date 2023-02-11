const chalk = require('chalk')
const yargs = require('yargs')
const { getNotes } = require('./notes')

// Add new note
yargs.command({
    command: "add",
    describe: "Add a new note",
    handler: () => {
        console.log(chalk.blueBright("Adding note..."))
    }
})

// List all notes
yargs.command({
    command: "list",
    describe: "List out all notes",
    handler: () => {
        console.log(chalk.greenBright("Loading..."));
    }
})

// Read a note
yargs.command({
    command: "read",
    describe: "Display a note",
    handler: () => {
        console.log(chalk.greenBright("Loading..."));
    }
})

// Remove a note
yargs.command({
    command: "remove",
    describe: "Remove a note",
    hadnler: () => {
        console.log(chalk.red("Removing note..."));
    }
})