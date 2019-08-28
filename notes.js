const fs = require('fs')
const chalk = require('chalk')

// ----- ADDS A NOTE -----
const addNote = (title, body) => {
    const notes = loadNotes()
    // new array method - find
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        // 2. change them
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

// ----- REMOVES A NOTE -----
const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.bgGreen('Note Removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.bgRed('No Note Found!'))
    }
}

// ---- LISTS ALL NOTES ----
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.yellow.inverse('YOUR NOTES'))
    notes.forEach(note => {
        console.log(note.title)
    });
}

// ---- READS THE NOTE ----
const readNote = (title) => {
    const notes = loadNotes()
    // search for the note we are looking for
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.green.inverse(note.title))
        console.log(chalk.white.inverse(note.body))
    } else {
        console.log(chalk.red.inverse('No Note found, please enter another note title.'))
    }
}


// ----- SAVES THE NOTES -----
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}
// ----- LOADS IN THE NOTES with Error Handling -----
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}