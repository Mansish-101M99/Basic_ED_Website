
const express = require('express');

const router = express.Router();     // This function will add a route to all the CRUD methods

const {Category, validate} = require('../Models/categoryModel');

/*
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
*/


/*
router.get('/categories/:id', (req, res) => {
    const categ = categories.find( (c) => c.id === parseInt(req.params.id) );
    if (!categ) return res.status(404).send('Category with given ID is not found..');
    res.send(categ);
});
*/
router.get('/:id', async (req, res) => {
    const categ = await Category.findById(req.params.id);
    if (!categ) return res.status(404).send('Category with given ID is not found..');
    res.send(categ);
});


/*
router.get('/categories', (req, res) => {
    res.send(categories);
});
*/
router.get('/', async (req, res) => {
    let categories = await Category.find()
    res.send(categories);
});


/*
router.post('/categories', (req, res) => {
    const {error} = validateData(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const categ = { id: categories.length + 1, name: req.body.name };
    categories.push(categ);
    res.send(categ);
});
*/
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const categ = new Category({
        name: req.body.name
    });
    await categ.save();
    res.send(categ);
});


/*
router.put('/categories/:id', (req, res) => {
    const categ = categories.find( (c) => c.id === parseInt(req.params.id) );
    if (!categ) return res.status(404).send('Category with given ID is not found..');

    if (req.body.error) return res.status(404).send(error.details[0].message);

    categ.name = req.body.name;
    res.send(categ);
});
*/
router.put('/:id', async (req, res) => {

    const {error} = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const categ = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!categ) return res.status(404).send('Category with given ID is not found..');

    res.send(categ);
});


/*
router.delete('/categories/:id', (req, res) => {
    const categ = categories.find( (c) => c.id === parseInt(req.params.id) );
    if (!categ) return res.status(404).send('Category with given ID is not found..');

    const idx = categories.indexOf(categ);
    categories.splice(idx, 1);

    res.send(categ);
});
*/
router.delete('/:id', async (req, res) => {
    const categ = await Category.findByIdAndRemove(req.params.id);
    if (!categ) return res.status(404).send('Category with given ID is not found..');

    res.send(categ);
});



module.exports = router;
