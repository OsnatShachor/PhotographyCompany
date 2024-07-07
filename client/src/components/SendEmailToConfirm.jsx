import React, { useState } from 'react';


function SendEmailToConfirm({ onClose, onSend }) {
  const[reason, setReason]=useState("");

  const handleSend = () => {
    onSend(4, reason);
    onClose();
};
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are You Sure You Want To Confirm This Order?</h2>
        <button onClick={handleSend}>Send</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default SendEmailToConfirm;
