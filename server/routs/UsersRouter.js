const express = require('express');
const router = express.Router();
const controller = require("../controllers/UsersController");
const jwt = require('jsonwebtoken')

router.post("/signUp", async (req, res) => {
    try {
        const body = req.body;
        console.log("Request body:", body);

        const returnedUser = await controller.createUser(body);
        const accessToken = jwt.sign(
            {
                userID: returnedUser.userID,
                roleID: returnedUser.roleID
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "5m" }
        );

        res.status(200).send({ returnedUser, accessToken });
    } catch (err) {
        console.error('Error during signUp:', err);
        res.status(500).send({ error: err.message });
    }
});

router.post("/logIn", async (req, res) => {
    try {
        const body = req.body;
        console.log("body " + JSON.stringify(body));
        const user = await controller.logIn(body);
        console.log("log in router" + JSON.stringify(user));
        if (user) {
            console.log(process.env.ACCESS_TOKEN_SECRET);
            const accessToken = jwt.sign(
                {
                    userID: user.userID,
                    roleID: user.roleID
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "5m" }
            );
            console.log("AccessToken:", accessToken);
            res.status(200).send({ user, accessToken });
        } else {
            res.status(400).json({ error: "User does not exist" });
        }
    } catch (err) {
        console.error("Error during login: ", err);
        res.status(500).json({ error: err.message });
    }
});


router.get("/:userID", async (req, res) => {
    try {
        const userID = req.params.userID;
        const user = await controller.getUserByUserID(userID);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: "Failed to get user" });
        throw error;
    }
},);
module.exports = router;
