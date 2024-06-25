const express = require('express');
const router = express.Router();
const controller = require("../controllers/UsersController");

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

                if (!user2[0]) {
                    const returnedUser = await controller.createUser(body.userName, body.email, body.phone, body.roleID, body.password);
                    console.log("User created successfully:", returnedUser);
                    res.json(returnedUser);
                } else {
                    console.log("User already exists");
                    res.status(400).send({ error: "The user already exists" });
                }
                break;
            case 3:
                const returnedUser={};
                const user3 = await controller.CheckIfExist(body.email);
                console.log(`client ${body.photographerId}`)
                console.log("User existence check result:", user3);
                if (!user3[0]) {// אם לא קיים כזה משתמש יוצר
                     returnedUser = await controller.createClient(body.photographerId, body.userName, body.email, body.phone, body.roleID, body.password);
                    console.log("User created successfully:", returnedUser);
                    res.json(returnedUser);
                } else {//אם קיים כזה משתמש - בודק האם הוא רשום לצלם אליו הוא מנסה להירשם
                    const photographerUser = await controller.checkRelation(user3[0].userID, body.photographerId)
                    console.log("checkRelation " + JSON.stringify(photographerUser));
                    if (photographerUser && photographerUser.length > 0) {//אם מצא קשר בין הלקוח לצלם
                        console.log("User already exists");
                        res.status(400).send({ error: "The user already exists" });
                    }
                    else {//יוצר קשר חדש - הלקוח לא היה רשום לצלם הזה
                        const photographerUser = await controller.createRelation(user3[0].userID, body.photographerId)
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
        if (user && user.length > 0) {
            const userId = user[0].userID;
            const passwordRecord = await controller.getPasswordByUserId(userId);
            if (passwordRecord && passwordRecord.length > 0 && body.password === passwordRecord[0].password) {
                console.log("Password matches");
                if(user[0].roleID==1)
                {
                    res.status(200).json(user[0]);
                }

                const photographerUser = await controller.checkRelation(userId, body.photographerId)
                console.log("checkRelation " + JSON.stringify(photographerUser));
                if (photographerUser && photographerUser.length > 0) {
                    res.status(200).json(user[0]);
                } // מחזיר את כל פרטי המשתמש
                else {
                    res.status(400).json({ error: "User does not exist" });
                }
            }
            else {
                res.status(400).json({ error: "Incorrect password" });
            }
        } else {
            console.error("User does not exist");
            res.status(400).json({ error: "User does not exist" });
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await controller.getUserByUserId(userId);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: "Failed to get user" });
        throw error;
    }
},);
module.exports = router;
