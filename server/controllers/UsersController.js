const model = require('../models/UsersModel');
const bcrypt = require('bcrypt');
async function CheckIfExist(email) {
    try {
        // const cryptedPassword = await bcrypt.hash(password, saltRounds)
        const user = await model.getUserByEmail(email);
        return user;
    } catch (err) {
        throw err;
    }
}

async function createUser(userName,email,phone,roleID, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return model.createUser(userName,email,phone,roleID, hashedPassword);
    } catch (err) {
        throw err;
    }
}

module.exports = {createUser,CheckIfExist}