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

const addCategory = async (req, res) => {
    const { photographerID, categoryName, payPerHour, numOfEditPictures } = req.body;

    try {
        const newCategory = await model.createCategory({
            photographerID,
            categoryName,
            payPerHour,
            numOfEditPictures
        });
        res.status(200).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add category' });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        console.log("delete Category controller");
        const result = await model.deleteCategory(categoryId);
        if (result) {
            res.json({ message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
};

const updateCategory = async (req, res) => {
    try {
      const body= req.body;
      const result = await model.updateCategory(body.categoryID,body.categoryName,body.payPerHour,body.numOfEditPictures);
      console.log("controller-upDate")
      if (result[0]) {
        res.status(200).json({ message: 'Category updated successfully' });
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update category' });
    }
  };
module.exports = {  getAllCategories, getOrderCategory, addCategory, deleteCategory,updateCategory }