
const express = require('express');

const router = express.Router();

const {Students, validate} = require('../Models/studentModel'); 


router.get('/:id', async (req, res) => {
    const stud = await Students.findById(req.params.id);
    if (!stud) return res.status(404).send('Student with given ID was not found..');
    res.send(stud);
});


router.get('/', async (req, res) => {
    let studn = await Students.find()
    res.send(studn);
});


router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const stud = new Students({
        name: req.body.name,
        isEnrolled: req.body.isEnrolled,
        phone_no: req.body.phone_no
    });
    await stud.save();
    res.send(stud);
});


router.put('/:id', async (req, res) => {

    const {error} = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const stud = await Students.findByIdAndUpdate(req.params.id, 
        { name: req.body.name, isEnrolled: req.body.isEnrolled, phone_no: req.body.phone_no }, 
        { new: true });
    if (!stud) return res.status(404).send('Student with given ID was not found..');

    res.send(stud);
});


router.delete('/:id', async (req, res) => {
    const stud = await Students.findByIdAndRemove(req.params.id);
    if (!stud) return res.status(404).send('Student with given ID was not found..');

    res.send(stud);
});



module.exports = router;