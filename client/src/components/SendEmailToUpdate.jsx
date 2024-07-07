import React, { useState } from 'react';


function SendEmailToUpdate({ onClose, onSend }) {
  const [reason, setReason] = useState("");
  
  const handleSend = () => {
    onSend(2, reason);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Sent Order For Update</h2>
        <textarea type="text"
           className="input"
           placeholder="What do you the client will change?"
           onChange={(e) => setReason(e.target.value)}
           value={reason} />
        <button onClick={handleSend}>Send</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default SendEmailToUpdate;
