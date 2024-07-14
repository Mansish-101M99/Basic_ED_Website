
const express = require('express');

const Joi = require('joi');

const router = express.Router();     // This function will add a route to all the CRUD methods


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

router.get('/api/categories', (req, res) => {
    res.send(categories);
});

router.post('/api/categories', (req, res) => {

    const {error} = validateData(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const categ = { id: categories.length + 1, name: req.body.name };
    categories.push(categ);
    res.send(categ);
});


router.put('/api/categories/:id', (req, res) => {
    const categ = categories.find( (c) => c.id === parseInt(req.params.id) );
    if (!categ) return res.status(404).send('Category with given ID is not found..');

    if (error) return res.status(404).send(error.details[0].message);

    categ.name = req.body.name;
    res.send(categ);
});


router.delete('/api/categories/:id', (req, res) => {
    const categ = categories.find( (c) => c.id === parseInt(req.params.id) );
    if (!categ) return res.status(404).send('Category with given ID is not found..');

    const idx = categories.indexOf(categ);
    categories.splice(idx, 1);

    res.send(categ);
});


router.get('/api/categories/:id', (req, res) => {
    const categ = categories.find( (c) => c.id === parseInt(req.params.id) );
    if (!categ) return res.status(404).send('Category with given ID is not found..');
    res.send(categ);
});


function validateData(category) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(category, schema);
}


module.exports = router;
