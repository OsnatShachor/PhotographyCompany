const authenticateToken = require('./authenticateToken'); 

const authorizeClient = (req, res, next) => {
    console.log('Client aothruzation ');
    authenticateToken.authenticateToken(req, res, () => {
        const user = req.user; 
        console.log('user', user)
        if (user && user.roleID === 3) {
            next(); 
        } else {
            res.status(403).send({ ok: false , massage: 'Illegal user action'}); 
        }
    });
};

module.exports = authorizeClient;