import React, { useState, useEffect } from 'react';

function UpdateCategoryPopUp({ show, handleClose, handleSave, category }) {
    const [categoryName, setCategoryName] = useState('');
    const [payPerHour, setPayPerHour] = useState('');
    const [numOfEditPictures, setNumOfEditPictures] = useState('');

    useEffect(() => {
        if (category) {
            setCategoryName(category.categoryName);
            setPayPerHour(category.payPerHour);
            setNumOfEditPictures(category.numOfEditPictures);
        }
    }, [category]);

    const handleSubmit = () => {
        handleSave({ categoryName, payPerHour, numOfEditPictures, categoryID: category.categoryID });
    };

    if (!show) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h4>Update Category</h4>
                <label>Category Name:</label>
                <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                <label>Pay Per Hour:</label>
                <input type="text" value={payPerHour} onChange={(e) => setPayPerHour(e.target.value)} />
                <label>Number Of Edit Pictures:</label>
                <input type="text" value={numOfEditPictures} onChange={(e) => setNumOfEditPictures(e.target.value)} />
                <button onClick={handleSubmit}>Save</button>
                <button onClick={handleClose}>Cancel</button>
            </div>
        </div>
    );
}

export default UpdateCategoryPopUp;
