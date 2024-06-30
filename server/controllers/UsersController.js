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
async function checkRelation(userID,photographerId) {
    try {
        // const hashedPassword = await bcrypt.hash(password, 10);
        const photographerUser = await model.checkRelation(userID,photographerId);
        console.log("createUserController "+photographerUser);
        return photographerUser;
    } catch (err) {
        throw err;
    }
}
async function createRelation(userID,photographerId) {
    try {
        // const hashedPassword = await bcrypt.hash(password, 10);
        const relation = await model.createRelation(userID,photographerId);
        return relation;
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
async function createClient(photographerId,userName, email, phone, roleID, password) {
    try {
        // const hashedPassword = await bcrypt.hash(password, 10);
        const user = await model.createClient(photographerId,userName, email, phone, roleID, password);
        return user;
    } catch (err) {
        throw err;
    }
}

async function getPasswordByUserID(userID) {
    try {
        // const hashedPassword = await bcrypt.hash(password, 10);
        const password = await model.getPasswordByUserID(userID);
        console.log("getPasswordByuserID Controller "+password);
        return password;
    } catch (err) {
        throw err;
    }
}
async function getUserByUserID(userID) {
    try {
        const user = await model.getUserByUserID(userID);
        console.log("getPasswordByuserID Controller "+user);
        return user;
    } catch (err) {
        throw err;
    }
}
module.exports = { createUser, CheckIfExist,getPasswordByUserID,createClient,getUserByUserID,checkRelation,createRelation }