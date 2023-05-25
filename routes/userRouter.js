const express = require('express');
const {modelUser} = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const routerUser = express.Router();

routerUser.post('/users/signup', async (req, res) => {
    try {
        
        let {email, password, username, role} = req.body;
        const user = await modelUser.find({email})
        
        if (user.length > 0) {
            res.status(400).json({message: 'User already exists'});
            return;
        }

        let hash = bcrypt.hashSync(password, 10);
        password = hash;
        const newUser = new modelUser({email, password, username, role});
        await newUser.save();
        res.status(200).json({message: 'User created successfully'});
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error});
    }
});


routerUser.post('/users/login', async (req, res) => {

    try {
        let {email, password} = req.body;
        const user = await modelUser.find({email})
        if (user.length == 0) {
            res.status(400).json({message: 'User does not exist'});
            return;
        }

        let hash = bcrypt.compareSync(password, user[0].password);
        if (!hash) {
            res.status(400).json({message: 'Incorrect password'});
            return;
        }else{
            const token = jwt.sign({email: user[0].email}, process.env.token_key);
            res.status(200).json({message: 'User logged in successfully',user,token});
        }


    } catch (error) {
        res.status(500).json({message: 'Internal server error', error});
    }
});

module.exports = {routerUser};