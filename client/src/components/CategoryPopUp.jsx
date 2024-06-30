import React, { useState } from 'react';

function CategoryPopUp({ showModal, handleClose, handleSave }) {
    const [categoryName, setCategoryName] = useState('');
    const [payPerHour, setPayPerHour] = useState('');
    const [numOfEditPictures, setNumOfEditPictures] = useState('');

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
                <button onClick={handleSubmit}>Save</button>
            </div>
        </div>
    );
}

export default CategoryPopUp;
