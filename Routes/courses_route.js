
const express = require('express');

const router = express.Router();

const { Course, validating } = require('../Models/courseModel');

const {Category} = require('../Models/categoryModel');



router.get('/:id', async (req, res) => {
    const cors = await Course.findById(req.params.id);
    if (!cors) return res.status(404).send('Student with given ID was not found..');
    res.send(cors);
});


router.get('/', async (req, res) => {
    let cors = await Course.find()
    res.send(cors);
});


router.post('/', async (req, res) => {
    const { error } = validating(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(404).send('Invalid ID ...');

    const cors = new Course({
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name
        },
        creator: req.body.creator,
        rating: req.body.rating
    });
    await cors.save();
    res.send(cors);
});


router.put('/:id', async (req, res) => {

    const { error } = validating(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(404).send('Invalid ID ...');

    const cors = await Course.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            category: {
                _id: category._id,
                name: category.name
            },
            creator: req.body.creator,
            rating: req.body.rating
        },
        { new: true });
    if (!cors) return res.status(404).send('Student with given ID was not found..');

    res.send(cors);
});


router.delete('/:id', async (req, res) => {
    const cors = await Course.findByIdAndRemove(req.params.id);
    if (!cors) return res.status(404).send('Student with given ID was not found..');

    res.send(cors);
});


module.exports = router;
