import React, { useState } from 'react';

function SendEmailToCancele({ onClose, onSend }) {
    const [reason, setReason] = useState("");

    const handleSend = () => {
        onSend(5, reason);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Are You Sure You Want To Cancel This Order?</h2>
                <textarea
                    type="text"
                    className="input"
                    placeholder="Cancel reason"
                    onChange={(e) => setReason(e.target.value)}
                    value={reason}
                />
                <button className ="submitBtn" onClick={handleSend}>Send</button>
                <button className ="submitBtn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default SendEmailToCancele;
