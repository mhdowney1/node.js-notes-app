const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')

// add, remove, read, list

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Create a remove command
yargs.command({
    command: 'remove',
    describe: 'Remove the note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string',
        }
    },
    // --- ES6 method syntax definition ---
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// Create the list command
yargs.command({
    command: 'list',
    describe: 'List the note',

    handler(argv) {
        notes.listNotes(argv.title)
    }
})

// Create the read command
yargs.command({
    command: 'read',
    describe: 'Read the note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()