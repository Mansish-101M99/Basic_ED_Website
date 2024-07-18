
const Joi = require('joi');

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2, maxlength: 50},
    isEnrolled: {type: Boolean, default: false},
    phone_no: {type: String, required: true, minlength: 10, maxlength: 20}
});

const Students = new mongoose.model('students', studentSchema);

function validateData(student) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        isEnrolled: Joi.boolean(),
        phone_no: Joi.string().min(10).max(20).required()
    });
    return schema.validate(student);
}


module.Students = Students;
module.validate = validateData;