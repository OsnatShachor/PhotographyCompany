const authenticateToken = require('./authenticateToken'); 

const authrizePhotographer = (req, res, next) => {
    console.log('Photographer aothruzation ');
    authenticateToken.authenticateToken(req, res, () => {
        const user = req.user; 
        console.log('admin user', user)
        if (user && user.roleID === 2) {
            next(); 
        } else {
            console.log('user try to delete')
            res.status(403).send({ ok: false , massage: 'A trainee tried to delete a new trainer'}); 
        }
    });
};

module.exports = authrizePhotographer;