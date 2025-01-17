
const mongoose = require('mongoose');

const Joi = require('joi');

const {categorySchema} = require('../Models/categoryModel');


const Course = new mongoose.model('Course', new mongoose.Schema({
    title: {type: String, required: true, trim: true, minlength: 5, maxlength: 300},
    category: {type: categorySchema, required: true},
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


exports.Course = Course;
exports.validating = validateData;
