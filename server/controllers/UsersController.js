const model = require('../models/UsersModel');
const bcrypt = require('bcrypt');
async function CheckIfExist(email) {
    try {
        // const cryptedPassword = await bcrypt.hash(password, saltRounds)
        const user = await model.getUserByEmail(email);
        console.log("controller user " + JSON.stringify(user));
        return user[0];
    } catch (err) {
        throw err;
    }
}
// async function checkRelation(userID, photographerId) {
//     try {
//         // const hashedPassword = await bcrypt.hash(password, 10);
//         const photographerUser = await model.checkRelation(userID, photographerId);
//         console.log("createUserController " + photographerUser);
//         return photographerUser;
//     } catch (err) {
//         throw err;
//     }
// }
// async function createRelation(userID, photographerId) {
//     try {
//         // const hashedPassword = await bcrypt.hash(password, 10);
//         const relation = await model.createRelation(userID, photographerId);
//         return relation;
//     } catch (err) {
//         throw err;
//     }
// }
// async function createUser(userName, email, phone, roleID, password) {
//     try {
//         // const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await model.createUser(userName, email, phone, roleID, password);
//         console.log("createUserController "+user);
//         return user;
//     } catch (err) {
//         throw err;
//     }
// }

async function createUser(body) {
    try {
        switch (body.roleID) {
            case 2:// אם נרשם בתור צלם
                const user2 = await CheckIfExist(body.email);
                console.log("User existence check result:", user2);
                if (!user2) {
                    try {
                        const newUser = await model.createUser(body.userName, body.email, body.phone, body.roleID, body.password);
                        console.log("createUserController " + newUser);
                        return newUser;
                    } catch (err) {
                        throw new Error("Error creating user: " + err.message);
                    }
                } else {
                    throw new Error("User already exists");
                }
                break;
            case 3://נרשם בתור לקוח
                let returnedUser = {};
                const user3 = await CheckIfExist(body.email);
                console.log(`client ${body.photographerId}`);
                console.log("User existence check result:", user3);
                if (!user3) {
                    try {
                        returnedUser = await model.createClient(body.photographerId, body.userName, body.email, body.phone, body.roleID, body.password);
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
                            return returnedUser;
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
        if (user) {
            const userID = user.userID;
            const passwordRecord = await model.getPasswordByUserID(userID);
            if (passwordRecord && passwordRecord.length > 0 && body.password === passwordRecord[0].password) {
                console.log("Password matches");
                if (user.roleID == 1 || user.roleID == 2) {
                    return user;
                } else {
                    const photographerUser = await model.checkRelation(userID, body.photographerId);
                    console.log("checkRelation " + JSON.stringify(photographerUser));
                    if (photographerUser && photographerUser.length > 0) {
                        return user;
                    } else {
                        throw new Error("User does not exist");
                    }
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


// async function createClient(photographerId, userName, email, phone, roleID, password) {
//     try {
//         // const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await model.createClient(photographerId, userName, email, phone, roleID, password);
//         return user;
//     } catch (err) {
//         throw err;
//     }
// }

// async function getPasswordByUserID(userID) {
//     try {
//         // const hashedPassword = await bcrypt.hash(password, 10);
//         const password = await model.getPasswordByUserID(userID);
//         console.log("getPasswordByuserID Controller " + password);
//         return password;
//     } catch (err) {
//         throw err;
//     }
// }
async function getUserByUserID(userID) {
    try {
        const user = await model.getUserByUserID(userID);
        console.log("getPasswordByuserID Controller " + user);
        return user;
    } catch (err) {
        throw err;
    }
}
module.exports = { createUser, CheckIfExist, logIn, getUserByUserID }