
const express = require('express')

const app = express()

app.use(express.json())


const categories = [
    { id: 1, name: "Front-End Development" },
    { id: 2, name: "Back-End Development" },
    { id: 3, name: "Full-Stack Development" },
    { id: 4, name: "Mobile App Development" },
    { id: 5, name: "Machine Learning" },
    { id: 6, name: "UI / UX Design" },
    { id: 7, name: "Block-Chain Technology" },
    { id: 8, name: "Cyber Security" },
    { id: 9, name: "Operating System Design" },
]

app.get('/api/categories', (req, res) => {
    res.send(categories);
});

app.post('/api/categories', (req, res) => {
    const categ = { id: categories.length + 1, name: req.body.name };
    categories.push(categ);
    res.send(categories);
});

app.put('/api/categories', (req, res) => {
    const categ = categories.find( (c) => c.id === parseInt(req.params.id) );
    if (!categ) return res.status(404).send('Category with given ID is not found..');

    if (error) return res.status(404).send(error.details[0].message);

    categ.name = req.body.name;
    res.send(categories);
});

