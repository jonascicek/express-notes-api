const express = require('express');
const app = express();
const port = 8080;



app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
});

let notes = [
    { note: 'My new Note', autor: 'Max Mustermann', date: '2025-01-15' },
];

app.get('/', (request, response) => {
    response.send('Hello World');
});

app.get('/notes', (request, response) => {
    response.json(notes);
});



