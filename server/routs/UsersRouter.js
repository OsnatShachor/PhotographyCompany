const express = require('express');
const router = express.Router();
const controller = require("../controllers/UsersController");

router.post("/signUp", async (req, res) => {
    try {
        console.log("Received signUp request");
        const body = req.body;
        console.log("Request body:", body);

        // בדוק אם המשתמש כבר קיים
        const user = await controller.CheckIfExist(body.email);
        console.log("User existence check result:", user);

        if (!user[0]) {
            const returnedUser = await controller.createUser(body.userName, body.email, body.phone, body.roleID, body.password);
            console.log("User created successfully:", returnedUser);
            res.json(returnedUser);
        } else {
            console.log("User already exists");
            res.status(400).send({error:"The user already exists"});
        }
    } catch (err) {
        console.error('Error during signUp:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/logIn", async (req, res) => {
    try {
        const body = req.body;
        const user = await controller.CheckIfExist(body.email);
        if (user && user.length > 0) { // בדיקה נוספת כדי לוודא שהמשתמש נמצא
            res.status(200).send(user);
        } else {
            res.sendStatus(400); // שימוש נכון ב-sendStatus להחזרת השגיאה
        }
    } catch (err) {
        res.status(500).send(err); // שימוש נכון ב-send להחזרת השגיאה
    }
});

module.exports = router;
