
const mongoose = require('mongoose');

const Joi = require('joi');


const Course = new mongoose.model('Course', new mongoose.Schema({
    title: {type: String, required: true, trim: true, minlength: 5, maxlength: 300},
    category: {},
    creator: {type: String, required: true},
    rating: {type: Number, required: true}
}));


function validateData(course) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(300).required(),
        category: Joi.string().required(),
        creator: Joi.string().min(2).required(),
        rating: Joi.number().required()
    });
}


module.Course = Course;
module.validating = validateData;
