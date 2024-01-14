// Express.js imports
const express = require('express');
const app = express();

// FS module allows to write content to the file
const fs = require('fs');

const path = require('path');

const PORT = 3001;

// Path to the db file
const notesDB = require('./db/db.json');

// Middleware to serve static and json files.
app.use(express.json());
app.use(express.static('public'));

// Get route for /notes path that serves 'notes.html' file.
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public', 'notes.html'));
});

// Get route for /api/notes path that serves 'db.json' file to the front end.
app.get('/api/notes', (req, res) => {
  res.json(notesDB);
});

// Post route for /api/notes path that captures and saves user input from front end, 
// and writes it to the 'db.json file'.
app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;

  const newNote = {
    id: Math.floor(Math.random() * 100),
    title,
    text,
  };

  notesDB.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(notesDB));

  res.json(newNote);
  });
// Create localhost port for app access.  
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
