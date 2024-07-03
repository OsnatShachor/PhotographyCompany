const authenticateToken = require('./authenticateToken'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authrizeManager = (req, res, next) => {
    console.log('Admin aothruzation  ');
    console.log("coco"+ req.cookies.accessToken);
    authenticateToken.authenticateToken(req, res, () => {
        const user = req.user; 
        console.log('admin user', user)
        if (user && user.roleID === 1) {
            next(); 
        } else {
            console.log('user try to delete')
            res.status(403).send({ ok: false , massage: 'A trainee tried to delete a new trainer'}); 
        }
    });
};

module.exports = authrizeManager;