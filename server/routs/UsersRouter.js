const express = require('express');
const router = express.Router();
const controller = require("../controllers/UsersController");
const jwt = require('jsonwebtoken')

router.post("/signUp", async (req, res) => {
    try {
        const body = req.body;
        const photographerId = body.photographerId
        console.log(photographerId);

        console.log("Request body:", body);
        switch (body.roleID) {
            case 2:
                const user2 = await controller.CheckIfExist(body.email);
                console.log("User existence check result:", user2);

                if (!user2) {
                    const returnedUser = await controller.createUser(body.userName, body.email, body.phone, body.roleID, body.password);
                    console.log("User created successfully:", returnedUser);
                    res.json(returnedUser);
                } else {
                    console.log("User already exists");
                    res.status(400).send({ error: "The user already exists" });
                }
                break;
            case 3:
                let returnedUser = {};
                const user3 = await controller.CheckIfExist(body.email);
                console.log(`client ${body.photographerId}`)
                console.log("User existence check result:", user3);
                if (!user3) {// אם לא קיים כזה משתמש יוצר
                    returnedUser = await controller.createClient(body.photographerId, body.userName, body.email, body.phone, body.roleID, body.password);
                    console.log("User created successfully:", returnedUser);
                    res.json(returnedUser);
                } else {//אם קיים כזה משתמש - בודק האם הוא רשום לצלם אליו הוא מנסה להירשם
                    const photographerUser = await controller.checkRelation(user3.userID, body.photographerId)
                    console.log("checkRelation " + JSON.stringify(photographerUser));
                    if (photographerUser && photographerUser.length > 0) {//אם מצא קשר בין הלקוח לצלם
                        console.log("User already exists");
                        res.status(400).send({ error: "The user already exists" });
                    }
                    else {//יוצר קשר חדש - הלקוח לא היה רשום לצלם הזה
                        const photographerUser = await controller.createRelation(user3.userID, body.photographerId)
                        res.json(returnedUser);
                    }
                }
                break;
        }
    } catch (err) {
        console.error('Error during signUp:', err);
        res.status(500).send('Internal Server Error');
    }
});

// const passwordMatch = await bcrypt.compare(body.password, user[0].password);
router.post("/logIn", async (req, res) => {
    try {
        const body = req.body;
        console.log("body " + JSON.stringify(body));
        const user = await controller.CheckIfExist(body.email);
        console.log("log in router" + JSON.stringify(user));

        if (user) {
            const userID = user.userID;
            const passwordRecord = await controller.getPasswordByUserID(userID);
            if (passwordRecord && passwordRecord.length > 0 && body.password === passwordRecord[0].password) {
                console.log("Password matches");
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

                res.cookie('accessToken', accessToken, {
                    httpOnly: true,
                    sameSite: "None",
                    secure: true,
                });
                console.log("accessToken:", accessToken);

                if (user.roleID == 1 || user.roleID == 2) {
                    res.status(200).send(user);
                } else {
                    const photographerUser = await controller.checkRelation(userID, body.photographerId);
                    console.log("checkRelation " + JSON.stringify(photographerUser));
                    if (photographerUser && photographerUser.length > 0) {
                        res.status(200).send(user);
                    } else {
                        res.status(400).json({ error: "User does not exist" });
                    }
                }
            } else {
                res.status(400).json({ error: "Incorrect password" });
            }
        } else {
            res.status(400).json({ error: "User does not exist" });
        }
    } catch (err) {
        console.error("Error during login: ", err);
        res.status(500).json({ error: "Internal Server Error" });
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
