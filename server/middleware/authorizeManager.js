const authenticateToken = require('./authenticateToken'); 
// const jwt = require('jsonwebtoken');
require('dotenv').config();

const authorizeManager = (req, res, next) => {
    console.log('manager authruzation  ');
    authenticateToken.authenticateToken(req, res, () => {
        const user = req.user; 
        console.log('admin user', user)
        if (user && user.roleID === 1) {
            next(); 
        } else {
            res.status(403).send({ ok: false , massage: 'Illegal user action'}); 
        }
    });
};

module.exports = authorizeManager;