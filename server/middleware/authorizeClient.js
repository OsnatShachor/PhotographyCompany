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

// const authenticateToken = require('./authenticateToken'); 

// const authorizeClient = async (req, res, next) => {
//     console.log('Client authorization ');

//     authenticateToken.authenticateToken(req, res, async () => {
//         const user = req.user; 
//         console.log('user', user);

//         if (user && user.roleID === 3) {
//             const { userID } = req.params;
//             if (parseInt(user.userID, 10) === parseInt(userID, 10)) {
//                 next();
//             } else {
//                 res.status(403).send({ ok: false, message: 'Illegal user action: Access to this order is not permitted' });
//             }
//         } else {
//             res.status(403).send({ ok: false, message: 'Illegal user action: User is not a client' });
//         }
//     });
// };

// module.exports = authorizeClient;
