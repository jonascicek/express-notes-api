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
    response.send(updatedNote);
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
    const id = request.params.id;
    notes = notes.filter((note) => note.id !== id);

    if (notes === -1) {
        response.status(404).send('Note not found');
    }
    response.send("Note deleted");
});



