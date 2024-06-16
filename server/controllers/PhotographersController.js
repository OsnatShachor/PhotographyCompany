const model = require('../models/PhotographersModel');

async function getAllPhotographers(){
    try{
        return await model.getAllPhotographers() 
    }catch(err){
        throw err;
    }
}
async function getCategory(photographerId){
    try{
        return await model.getCategory(photographerId) 
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

module.exports = {getAllPhotographers,getCategory,getInformation}