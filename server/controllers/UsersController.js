const model = require('../models/UsersModel');
const bcrypt = require('bcrypt');
async function CheckIfExist(email) {
    try {
        // const cryptedPassword = await bcrypt.hash(password, saltRounds)
        const user = await model.getUserByEmail(email);
        console.log("controller user " + JSON.stringify(user));
        return user;
    } catch (err) {
        throw err;
    }
}

async function createUser(userName, email, phone, roleID, password) {
    try {
        // const hashedPassword = await bcrypt.hash(password, 10);
        const user = await model.createUser(userName, email, phone, roleID, password);
        console.log("createUserController "+user);
        return user;
    } catch (err) {
        throw err;
    }
}

module.exports = { createUser, CheckIfExist }