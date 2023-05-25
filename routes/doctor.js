
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
        const doctors = await modelDoctor.find();
        res.status(200).json({message: 'Doctors fetched successfully', doctors});
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error});
    }
});

routerDoctor.get('/all/appointments', async (req, res) => {
    try {
        
        const doctors = await modelDoctor.find();
        console.log(doctors)
        res.status(200).json({message: 'Doctors all data', doctors});
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error});
    }
});



routerDoctor.delete('/appointments/delete/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        await modelDoctor.findByIdAndDelete(id);
        res.status(200).json({message: 'Doctor deleted successfully'});

    } catch (error) {
        res.status(500).json({message: 'Internal server error', error});
    }
});


routerDoctor.patch('/appointments/edit/:id', auth, async (req, res) => {
    try {
        let id = req.params.id;
        const user = await modelDoctor.findByIdAndUpdate({_id:id}, req.body);
        res.status(200).json({message: 'Doctor updated successfully'});

    } catch (error) {
        res.status(500).json({message: 'Internal server error', error});
    }
});


module.exports = {routerDoctor};