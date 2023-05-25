

const mongoose = require('mongoose');


const doctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageurl: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    slots: {
        type: Number,
        required: true,
    },
    fee: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
    }
});


const modelDoctor = mongoose.model('doctor', doctorSchema);


module.exports = {modelDoctor};