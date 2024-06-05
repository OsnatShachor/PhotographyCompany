const model = require('../models/PhotographersModel');

async function getAllPhotographers(){
    try{
        return await model.getAllPhotographers() 
    }catch(err){
        throw err;
    }
}


module.exports = {getAllPhotographers}