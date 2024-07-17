
const express = require('express');

const router = express.Router();

const Joi = require('joi');

const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 50},
    isEnrolled: {type: Boolean, default: false},
    phone_no: {type: String, required: true, minlength: 10, maxlength: 20}
});

const students = new mongoose.model('students', studentSchema);


module.exports = router;