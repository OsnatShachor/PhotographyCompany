const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
    console.log(req.headers);
    const token = req.headers.authorization.replace('Bearer ',"");
    console.log("token: " + token);
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({message: "Invalid token"});
        }
        req.user = decoded;
       
        next();
    });
}

module.exports = { authenticateToken };
