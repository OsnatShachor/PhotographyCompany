const express = require('express');
const router = express.Router();
const controller = require("../controllers/UsersController");

router.post("/signUp", async (req, res) => {
    try {
        console.log("userId")
        const body = (req.body)
        const user = await controller.CheckIfExist(body.email);
        console.log(user)
        if (!user[0])
            res.status(200).send(await controller.createUser(body.userName, body.email, body.phone, body.roleID, body.password));
        else
            res.status(400).send("The user is already exist");
    }
    catch (err) {
        res.status(500).send(err);
        throw (err);
    }
});

router.post("/logIn", async (req, res) => {
    try {
        const body = (req.body)
        const userId = await controller.CheckIfExist(body.email);
        if (userId)
            res.status(200).send(user);
        else
            res.status(400);
    }
    catch (err) {
        res.status(500).send(err);
    }



});
module.exports = router;