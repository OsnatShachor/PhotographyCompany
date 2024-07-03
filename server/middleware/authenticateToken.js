const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
    const token = req.cookies.accessToken;
    console.log("token: " + token);
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send({message: "Invalid token"});
        }
        req.userId = decoded.userId;
        req.roleId = decoded.roleId;
        next();
    });
}

module.exports = { authenticateToken };
