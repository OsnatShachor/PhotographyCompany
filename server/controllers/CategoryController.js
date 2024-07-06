const model = require('../models/CategoryModel');


async function getAllCategories(photographerId) {
    try {
        return await model.getAllCategories(photographerId)
    } catch (err) {
        throw err;
    }
}

async function getOrderCategory(categoryID) {
    try {
        return await model.getOrderCategory(categoryID)
    } catch (err) {
        throw err;
    }
}

async function updateCategory(body) {
    try {
        const result = await model.updateCategory(body.categoryID, body.categoryName, body.payPerHour, body.numOfEditPictures);
        return result[0];
    } catch (err) {
        throw err;
    }
}


async function addCategory(body) {
    const { photographerID, categoryName, payPerHour, numOfEditPictures } = body;
    try {
        const newCategory = await model.createCategory({
            photographerID,
            categoryName,
            payPerHour,
            numOfEditPictures
        });
        return newCategory;
    } catch (err) {
        throw err;
    }
};

async function deleteCategory(categoryId) {
    try {
        const result = await model.deleteCategory(categoryId);
        return result;
    } catch (err) {
        throw err;
    }
};


module.exports = { getAllCategories, getOrderCategory, addCategory, deleteCategory, updateCategory }