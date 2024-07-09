const model = require('../models/UsersModel');
const bcrypt = require('bcrypt');
const saltRounds = 10; // קביעת מספר סיבובי ההצפנה

async function CheckIfExist(email) {
    try {
        const user = await model.getUserByEmail(email);
        console.log("controller user " + JSON.stringify(user));
        return user[0];
    } catch (err) {
        throw err;
    }
}
async function checkRelation(userID, photographerID) {
    try {
        const relation = await model.checkRelation(userID, photographerID);
        return relation;
    } catch (err) {
        throw err;
    }
}
async function createUser(body) {
    try {
        switch (body.roleID) {
            case 2: // אם נרשם בתור צלם
                const user2 = await CheckIfExist(body.email);
                console.log("User existence check result:", user2);
                if (!user2) {
                    try {
                        const hashedPassword = await bcrypt.hash(body.password, saltRounds);
                        const newUser = await model.createUser(body.userName, body.email, body.phone, body.roleID, hashedPassword);
                        console.log("createUserController " + newUser);
                        return newUser;
                    } catch (err) {
                        throw new Error("Error creating user: " + err.message);
                    }
                } else {
                    throw new Error("User already exists");
                }
                break;
            case 3: // נרשם בתור לקוח
                let returnedUser = {};
                const user3 = await CheckIfExist(body.email);
                console.log(`client ${body.photographerId}`);
                console.log("User existence check result:", user3);
                if (!user3) {
                    try {
                        const hashedPassword = await bcrypt.hash(body.password, saltRounds);
                        returnedUser = await model.createClient(body.photographerId, body.userName, body.email, body.phone, body.roleID, hashedPassword);
                        console.log("User created successfully:", returnedUser);
                        return returnedUser;
                    } catch (err) {
                        throw new Error("Error creating client: " + err.message);
                    }
                } else {
                    try {
                        const photographerUser = await model.checkRelation(user3.userID, body.photographerId);
                        console.log("checkRelation " + JSON.stringify(photographerUser));
                        if (photographerUser && photographerUser.length > 0) {
                            throw new Error("The user already exists");
                        } else {
                            await model.createRelation(user3.userID, body.photographerId);
                            const existUser = await getUserByUserID(user3.userID);
                            return existUser[0];
                        }
                    } catch (err) {
                        throw new Error("Error checking/creating relation: " + err.message);
                    }
                }
                break;
            default:
                throw new Error("Invalid roleID");
        }
    } catch (err) {
        throw new Error("Error in createUser: " + err.message);
    }
}

async function logIn(body) {
    try {
        const user = await CheckIfExist(body.email);
        console.log("log in controller" + JSON.stringify(user));
        if (user) { // אם מצא כזה לקוח
            const userID = user.userID;
            const passwordRecord = await model.getPasswordByUserID(userID);
            if (passwordRecord && passwordRecord.length > 0) {
                const match = await bcrypt.compare(body.password, passwordRecord[0].password);
                if (match) {
                    console.log("Password matches");
                    if (user.roleID == 1 || user.roleID == 2) { // אם הוא מנהל / צלם זה מספיק - הוא מחובר
                        return user;
                    } else {
                        const photographerUser = await model.checkRelation(userID, body.photographerId);
                        console.log("checkRelation " + JSON.stringify(photographerUser));
                        if (photographerUser && photographerUser.length > 0) { // אם הלקוח נרשם לצלם
                            return user;
                        } else {
                            throw new Error("User does not exist");
                        }
                    }
                } else {
                    throw new Error("Incorrect password");
                }
            } else {
                throw new Error("Incorrect password");
            }
        } else {
            throw new Error("User does not exist");
        }
    } catch (err) {
        throw new Error("Error in logIn: " + err.message);
    }
}

async function getUserByUserID(userID) {
    try {
        const user = await model.getUserByUserID(userID);
        console.log("getPasswordByuserID Controller " + user);
        return user;
    } catch (err) {
        throw err;
    }
}

module.exports = { createUser, CheckIfExist, logIn, getUserByUserID,checkRelation }
