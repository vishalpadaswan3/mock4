const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization
        let decoded = jwt.verify(token, process.env.token_key);
        
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: 'Unauthorized'});
    }
}

module.exports = {auth};