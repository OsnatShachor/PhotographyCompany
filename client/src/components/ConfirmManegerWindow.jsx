import React from 'react';


function ConfirmManegerWindow({ onClose, onConfirm }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Approval Request</h2>
        <p>Are you sure you want to approve this request?</p>
        <button onClick={onConfirm}>Send</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default ConfirmManegerWindow;
