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

app.put('/notes/:id', (req, res) => {
    const note = notes.find(note => note.id === parseInt(req.params.id));

    if (!note) {
        return res.status(404).json({ message: "Note not found!" });
    }

    const { note: updatedNote, autor } = req.body;
    if (!updatedNote || !autor) {
        return res.status(400).json({ message: "All fields (note, autor) required" });
    }

    note.note = updatedNote;
    note.autor = autor;
    note.date = new Date();

    res.json(note);
});

app.put('/notes/:id', (request, response) => {
    const index = notes.findIndex((note) => note.id === request.params.id);
    if (index === -1) {
        response.status(404).send('Note not found');
    }
    const updatedNote = {
        id: request.params.id,
        note: request.body.note,
        autor: request.body.autor,
        date: new Date(),
    };
    notes[index] = updatedNote;
    response.json(updatedNote);
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

app.delete('/notes/:id', (request, response) => {
    let id = parseInt(request.params.id);
    notes.filter((note) => note.id !== id);

    if (!notes) {
        response.status(404).send('Note not found');
    } else {
        response.send("Note deleted");
    }
});



