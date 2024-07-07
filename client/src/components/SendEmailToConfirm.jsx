import React, { useState } from 'react';


function SendEmailToConfirm({ onClose, onSend }) {
  const[reason, setReason]=useState("");
  const statusID=4;
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Are You Sure You Want To Confirm This Order?</h2>
        <button onClick={()=>onSend(statusID,reason)}>Send</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default SendEmailToConfirm;
