
const express = require('express');
const {modelDoctor} = require('../model/doctor');
const {auth} = require('../middleware/auth');

const routerDoctor = express.Router();

routerDoctor.post('/appointments', auth, async (req, res) => {
    try {
        let em = req.user.email;
        let {name, imageurl, specialization, experience, location, date, slots, fee} = req.body;
        const newDoctor = new modelDoctor({name, imageurl, specialization, experience, location, date, slots, fee,email:em});
        await newDoctor.save();
        res.status(200).json({message: 'Doctor added successfully'});
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error});
    }
});


routerDoctor.get('/appointments', auth, async (req, res) => {
    try {
        
        let em = req.user.email;
        const doctors = await modelDoctor.find({email:em});
        res.status(200).json({message: 'Doctors fetched successfully', doctors});
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error});
    }
});

module.exports = {routerDoctor};