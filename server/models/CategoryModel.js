const pool = require('../DB.js');

async function getAllCategories(photographerId) {
  try {
    const sql = `
       SELECT *
       FROM category
       WHERE photographerId = ?
    `;
    const [rows] = await pool.query(sql, [photographerId]);
    return rows;
  } catch (err) {
    return (err);
  }
}

async function getOrderCategory(categoryID) {
  try {
    const sql = `
       SELECT *
       FROM category
       WHERE categoryID = ?
    `;
    const [rows] = await pool.query(sql, [categoryID]);
    return rows;
  } catch (err) {
    return (err);
  }
}


async function createCategory(newCategory) {
  try {
    const sql = `
      INSERT INTO category (photographerID, categoryName, payPerHour, numOfEditPictures) values (?, ?, ?, ?)
    `;
    await pool.query(sql, [newCategory.photographerID, newCategory.categoryName, newCategory.payPerHour, newCategory.numOfEditPictures]);
  } catch (err) {
    return (err);
  }
}

async function deleteCategory(deleteCategoryID) {
  try {
    const sql = `
      DELETE from category where categoryID=? `;
      console.log("delete Category model");
    await pool.query(sql, [deleteCategoryID]);
  } catch (err) {
    return (err);
  }
}

async function updateCategory(categoryID,categoryName,payPerHour,numOfEditPictures){
  try {
   
    const sql = `
    UPDATE category
    SET  categoryName = ?, payPerHour = ?, numOfEditPictures = ?
    WHERE categoryID = ?
    `;
    console.log("updateCategory model");
    // const {categoryName,payPerHour,numOfEditPictures } = updatedOrderData;
    const [result] = await pool.query(sql, [categoryID,categoryName,payPerHour,numOfEditPictures]);
    console.log(result);
   return result;

   // return result.affectedRows > 0 ? { orderID: orderId, ...updatedOrderData } : null;
} catch (err) {
    throw err;
}
}

module.exports = { getAllCategories, getOrderCategory, createCategory, deleteCategory,updateCategory }  
