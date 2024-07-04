const authenticateToken = require('./authenticateToken'); 

const authorizePhotographer = (req, res, next) => {
    console.log('Photographer authorize ');
    authenticateToken.authenticateToken(req, res, () => {
        const user = req.user; 
        console.log('Photographer user', user)
        if (user && user.roleID === 2) {
            next(); 
        } else {
            res.status(403).send({ ok: false , massage: 'Illegal user action'}); 
        }
    });
};

module.exports = authorizePhotographer;