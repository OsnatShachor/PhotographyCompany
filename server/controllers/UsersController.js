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
    switch (body.roleID) {
        case 2:
            const user2 = await CheckIfExist(body.email);
            console.log("User existence check result:", user2);
            if (!user2) {
                try {
                    // const hashedPassword = await bcrypt.hash(password, 10);
                    const newUser = await model.createUser(body.userName, body.email, body.phone, body.roleID, body.password);
                    console.log("createUserController " + newUser);

                    return newUser;
                } catch (err) {
                    throw err;
                }
            }
            break;
        case 3:
            let returnedUser = {};
            const user3 = await CheckIfExist(body.email);
            console.log(`client ${body.photographerId}`)
            console.log("User existence check result:", user3);
            if (!user3) {// אם לא קיים כזה משתמש יוצר
                try {
                    // const hashedPassword = await bcrypt.hash(password, 10);
                    returnedUser = await model.createClient(body.photographerId, body.userName, body.email, body.phone, body.roleID, body.password);
                    console.log("User created successfully:", returnedUser);
                    return returnedUser;
                } catch (err) {
                    throw err;
                }
            } else {//אם קיים כזה משתמש - בודק האם הוא רשום לצלם אליו הוא מנסה להירשם
                try {
                    const photographerUser = await model.checkRelation(user3.userID, body.photographerId)
                    console.log("checkRelation " + JSON.stringify(photographerUser));
                    if (photographerUser && photographerUser.length > 0) {//אם מצא קשר בין הלקוח לצלם
                        console.log("User already exists");
                        return ({ error: "The user already exists" });
                    }
                    else {//יוצר קשר חדש - הלקוח לא היה רשום לצלם הזה
                        const newPhotographerUser = await model.createRelation(user3.userID, body.photographerId)
                        return returnedUser;
                    }
                } catch (err) {
                    throw err;
                }
            }
            break;
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
                    try {
                        const photographerUser = await model.checkRelation(userID, body.photographerId);
                        console.log("checkRelation " + JSON.stringify(photographerUser));
                        if (photographerUser && photographerUser.length > 0) {
                            return user;
                        } else {
                            throw ({ error: "User does not exist" });
                        }
                    } catch (err) {
                        throw err;
                    }
                }
            } else {
                throw ({ error: "Incorrect password" });
            }
        } else {
            throw ({ error: "User does not exist" });
        }
    } catch (err) {
        throw err;
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
module.exports = { createUser, CheckIfExist,logIn, getUserByUserID }