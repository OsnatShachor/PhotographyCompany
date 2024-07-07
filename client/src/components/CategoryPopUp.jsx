import React, { useState, useEffect } from 'react';

function CategoryPopUp({ showModal, handleClose, handleSave, initialCategoryData }) {
    const [categoryName, setCategoryName] = useState('');
    const [payPerHour, setPayPerHour] = useState('');
    const [numOfEditPictures, setNumOfEditPictures] = useState('');

    useEffect(() => {
        if (showModal) {
            setCategoryName(initialCategoryData.categoryName);
            setPayPerHour(initialCategoryData.payPerHour);
            setNumOfEditPictures(initialCategoryData.numOfEditPictures);
        }
    }, [showModal, initialCategoryData]);

    const handleSubmit = () => {
        handleSave({ categoryName, payPerHour, numOfEditPictures });
        handleClose();
    };

    if (!showModal) {
        return null;
    }

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
                <button  className ="submitBtn"onClick={handleSubmit}>Save</button>
            </div>
        </div>
    );
}

export default CategoryPopUp;
