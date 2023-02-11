// const validator = require('validator').default
const chalk = require('chalk')
const { getNotes } = require('./notes')

// const myNotes = getNotes()
const command = process.argv[2]

if (command === "add") {
    console.log(chalk.blueBright("Adding notes..."))
}
else if (command === "remove") {
    console.log(chalk.redBright("Removing notes..."))
}
else if (command === undefined) {
    const myNotes = getNotes()
    console.log(chalk.blueBright("Loading your notes...\n"))
    console.log(myNotes)
}
else {
    console.log(chalk.redBright("Invalid argument!"))
}


// console.log(chalk.bold("Hello, I am your NoteBot. I keep track of your notes here ~"))
// console.log(chalk.blueBright("Loading your notes...\n"))
// console.log(myNotes)
// console.log(chalk.green.inverse("DONE!"))
// console.log(validator.isEmail('hi@hi.com'))