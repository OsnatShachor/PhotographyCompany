const model = require('../models/WelcomePageModel');
async function getAllPhotographers(){
    try{
        return await model.getAllPhotographers() 
    }catch(err){
        throw err;
    }
}
module.exports = {getAllPhotographers}