import React, { useState, useEffect } from 'react';

function UpdateCategoryPopUp({  handleClose, handleSave, category }) {
    const [categoryName, setCategoryName] = useState(category.categoryName);
    const [payPerHour, setPayPerHour] = useState(category.payPerHour);
    const [numOfEditPictures, setNumOfEditPictures] = useState(category.numOfEditPictures);


    const handleSubmit = () => {
        handleSave({ categoryName, payPerHour, numOfEditPictures, categoryID: category.categoryID });// הפונקציה מהעמוד הקודם, שמעדכנת בדטה-בייס
    };


    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Update Category</h2>
                <h3>Category Name:</h3>
                <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                <h3>Pay Per Hour:</h3>
                <input type="text" value={payPerHour} onChange={(e) => setPayPerHour(e.target.value)} />
                <h3>Number Of Edit Pictures:</h3>
                <input type="text" value={numOfEditPictures} onChange={(e) => setNumOfEditPictures(e.target.value)} />
                <button onClick={handleSubmit}>Save</button>
                <button onClick={handleClose}>Cancel</button>
            </div>
        </div>
    );
}

export default UpdateCategoryPopUp;
