const model = require('../models/PhotographersModel');

async function getAllActivePhotographers(){
    try{
        return await model.getAllActivePhotographers() 
    }catch(err){
        throw err;
    }
}
async function getAllCategories(photographerId){
    try{
        return await model.getAllCategories(photographerId) 
    }catch(err){
        throw err;
    }
}

async function getOrderCategory(categoryID){
    try{
        return await model.getOrderCategory(categoryID) 
    }catch(err){
        throw err;
    }
}

async function getInformation(photographerId){
    try{
        return await model.getInformation(photographerId) 
    }catch(err){
        throw err;
    }
}

module.exports = {getAllActivePhotographers,getAllCategories,getInformation,getOrderCategory}