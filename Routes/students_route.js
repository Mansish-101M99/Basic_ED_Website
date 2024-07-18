
const express = require('express');

const router = express.Router();

const Joi = require('joi');

const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 50},
    isEnrolled: {type: Boolean, default: false},
    phone_no: {type: String, required: true, minlength: 10, maxlength: 20}
});

const Students = new mongoose.model('students', studentSchema);


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
    const {error} = validateData(req.body);
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

    const {error} = validateData(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const stud = await Students.findByIdAndUpdate(req.params.id, 
        { name: req.body.name, isEnrolled: req.body.isEnrolled, phone_no: req.body.phone_no }, 
        { new: true });
    if (!stud) return res.status(404).send('Student with given ID was not found..');

    stud.name = req.body.name;
    res.send(stud);
});


router.delete('/:id', async (req, res) => {
    const stud = await Students.findByIdAndRemove(req.params.id);
    if (!stud) return res.status(404).send('Student with given ID was not found..');

    res.send(stud);
});


function validateData(student) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        isEnrolled: Joi.boolean(),
        phone_no: Joi.string().min(10).max(20).required()
    });
    return schema.validate(student);
}


module.exports = router;