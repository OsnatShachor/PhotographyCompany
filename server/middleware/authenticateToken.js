const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
    const token = req.headers.authorization.replace('Bearer ',"");
    // const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({message: "Invalid token"});
        }
        console.log("authenticate"+JSON.stringify(decoded));
        req.user = decoded;
       
        next();
    });
}

module.exports = { authenticateToken };
