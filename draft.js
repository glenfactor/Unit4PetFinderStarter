// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as a static index.html file
    res.sendFile(__dirname + '/public/index.html');
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World! This is the Pet Finder API');
});

// Get all pets from the database
// When a GET is sent to the /api/v1/pets endpoint
// Get all the pets from the pets array
// Send the pets array as a JSON response

app.get('/api/v1/pets', (req, res) => {
    try {
        res.json(pets); // Send the pets array as a JSON response
    } catch (error) {
        console.error('Error retrieving pets', error);
        res.status(500).json({ error: 'Error retrieving pets' });
    }
});

// Get pet by name
// When a GET request is received on '/api/v1/pets/:name':
// Extract the 'name' parameter from the request.
// Retrieve pets from the database where name matches the parameter.
// Return a JSON response with the matching pets.

app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    try {
        const name = req.params.name;
        const pet = pets.find(pet => pet.name === name); // Find the pet by name

        if (pet) {
            res.json(pet); // Send the pet as a JSON response
        } else {
            res.status(404).json({ error: 'Pet name not found' });
        }
    } catch (error) {
        console.error('Error retrieving pet name', error);
        res.status(500).json({ error: 'Error retrieving pet name' });
    }
});

// Get pet by owner with query string
// When a GET request is received on '/api/v1/pets/owner':
// Extract the 'owner' query parameter from the request.
// Retrieve pets from the database where owner's name matches the parameter.
// Return a JSON response with the pets owned by the specified owner.

app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request
    try {
        const owner = req.query.owner;
        const petsByOwner = pets.filter(pet => pet.owner === owner); // Find pets by owner

        if (petsByOwner.length > 0) {
            res.json(petsByOwner); // Send the pets as a JSON response
        } else {
            res.status(404).json({ error: 'No pets found for the owner' });
        }
    } catch (error) {
        console.error('Error retrieving pets by owner', error);
        res.status(500).json({ error: 'Error retrieving pets by owner' });
    }
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;
