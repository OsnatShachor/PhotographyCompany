// src/components/ConfirmationModal.js
import React from 'react';

function ConfirmationPopUp({ handleClose, handleConfirm }) {


    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={handleClose}>&times;</span>
                <h2>Are you sure you want to delete this category?</h2>
                <button className ="submitBtn" onClick={handleConfirm}>Confirm</button>
                <button className ="submitBtn" onClick={handleClose}>Cancel</button>
            </div>
        </div>
    );
}

export default ConfirmationPopUp;
