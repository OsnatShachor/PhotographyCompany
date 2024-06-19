const express = require('express');
const router = express.Router();
const controller = require("../controllers/UsersController");

router.post("/signUp", async (req, res) => {
    try {
        const body = req.body;
        const photographerId=body.photographerId
        console.log(photographerId);

        console.log("Request body:", body);
        switch (body.roleID) {
            case 1:
        
                break;
            case 2:
                const user1 = await controller.CheckIfExist(body.email);
                console.log("User existence check result:", user1);
                if (!user1[0]) {
                    const returnedUser = await controller.createUser(body.userName, body.email, body.phone, body.roleID, body.password);
                    console.log("User created successfully:", returnedUser);
                    res.json(returnedUser);
                } else {
                    console.log("User already exists");
                    res.status(400).send({ error: "The user already exists" });
                }
                break;
            case 3:
                const user3 = await controller.CheckIfExist(body.email);
                console.log(`client ${body.photographerId}`)
                console.log("User existence check result:", user3);
                if (!user3[0]) {
                    const returnedUser = await controller.createClient(body.photographerId,body.userName, body.email, body.phone, body.roleID, body.password);
                    console.log("User created successfully:", returnedUser);
                    res.json(returnedUser);
                } else {
                    console.log("User already exists");
                    res.status(400).send({ error: "The user already exists" });
                }
                break;
            case 4:
                const user4 = await controller.CheckIfExist(body.email);
                console.log("User existence check result:", user4);

                if (!user4[0]) {
                    const returnedUser = await controller.createUser(body.userName, body.email, body.phone, body.roleID, body.password);
                    console.log("User created successfully:", returnedUser);
                    res.json(returnedUser);
                } else {
                    console.log("User already exists");
                    res.status(400).send({ error: "The user already exists" });
                }
                break;
            default:
                text = "Looking forward to the Weekend";
        }
    } catch (err) {
        console.error('Error during signUp:', err);
        res.status(500).send('Internal Server Error');
    }
});

// const passwordMatch = await bcrypt.compare(body.password, user[0].password);
router.post("/logIn", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            console.error("Missing email or password");
            return res.status(400).json({ error: "Email and password are required" });
        }

        console.log("Received login request for email:", email);
        const user = await controller.CheckIfExist(email);
        if (user && user.length > 0) {
            const userId = user[0].userID;
            console.log("User found with ID:", userId);

            const passwordRecord = await controller.getPasswordByUserId(userId);
            console.log("Password record:", passwordRecord);

            if (passwordRecord && passwordRecord.length > 0 && password === passwordRecord[0].password) {
                console.log("Password matches");
                res.status(200).json(user[0]); // מחזיר את כל פרטי המשתמש
            } else {
                console.error("Incorrect password");
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


module.exports = router;
