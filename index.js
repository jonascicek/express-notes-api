const express = require('express');
const app = express();
const port = process.env.NOTES_API_PORT || 8080;

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
});

let notes = [
    { id: 1, note: 'My new Note', autor: 'Max Mustermann', date: '2025-01-15' }
];

app.use(express.json());

app.get('/', (request, response) => {
    response.send('Hello World');
});

app.get('/notes', (request, response) => {
    response.json(notes);
});

app.get('/notes/:id', (request, response) => {
    const id = parseInt(request.params.id);
    let findNote = null;
    notes.forEach((note) => {
        if (note.id === id) {
            findNote = note;
        }
    });
    if (findNote) {
        response.json(findNote);
    } else {
        response.status(404).send('Note not found');
    }
});

app.put('/notes/:id', (req, res) => {
    const note = notes.find(note => note.id === parseInt(req.params.id));

    if (!note) {
        return res.status(404).json({ message: "Note not found!" });
    }

    const { note: updatedNote, autor } = req.body;
    if (!updatedNote || !autor) {
        return res.status(400).json({ message: "All fields (note, autor, date) required" });
    }

    note.note = updatedNote;
    note.autor = autor;
    note.date = new Date().toDateString();

    res.json(note);
});

app.post('/notes', (request, response) => {
    const newNote = {
        id: notes.length + 1,
        note: request.body.note,
        autor: request.body.autor,
        date: new Date(),
    };
    notes.push(newNote);
    response.json(notes);
});

app.delete('/notes/:id', (req, res) => {
    const noteIndex = notes.findIndex(note => note.id === parseInt(req.params.id));
    if (noteIndex === -1) {
        return res.status(404).json({ message: "Note not found" });
    }
    const deletedNote = notes.splice(noteIndex, 1)[0];
    res.json(deletedNote);
});



