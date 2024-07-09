import React, { useState, useEffect } from 'react';

function CategoryPopUp({ handleClose, handleSave, initialCategoryData }) {
    const [categoryName, setCategoryName] = useState('');
    const [payPerHour, setPayPerHour] = useState('');
    const [numOfEditPictures, setNumOfEditPictures] = useState('');
    const [validationError, setValidationError] = useState('');

    useEffect(() => {

        setCategoryName(initialCategoryData.categoryName || '');
        setPayPerHour(initialCategoryData.payPerHour || '');
        setNumOfEditPictures(initialCategoryData.numOfEditPictures || '');

    }, [ initialCategoryData]);

    const handleSubmit = () => {
        // Validation checks
        if (!categoryName) {
            setValidationError('Please enter a category name.');
            return;
        }
        if (!payPerHour) {
            setValidationError('Please enter pay per hour.');
            return;
        }
        if (!numOfEditPictures) {
            setValidationError('Please enter the number of edited pictures.');
            return;
        }

        // Clear validation error
        setValidationError('');

        handleSave({ categoryName, payPerHour, numOfEditPictures });
        handleClose();
    };

   

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={handleClose}>&times;</span>
                <h2>Add New Category</h2>
                <div className='addCategory-content'>
                    <input
                        type="text"
                        placeholder="Category Name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Pay Per Hour"
                        value={payPerHour}
                        onChange={(e) => setPayPerHour(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Number of Edit Pictures"
                        value={numOfEditPictures}
                        onChange={(e) => setNumOfEditPictures(e.target.value)}
                    />
                </div>
                {validationError && <p className="error-message">{validationError}</p>}
                <button className="submitBtn" onClick={handleSubmit}>Save</button>
            </div>
        </div>
    );
}

export default CategoryPopUp;
