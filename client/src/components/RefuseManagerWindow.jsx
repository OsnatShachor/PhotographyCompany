import React from 'react';


function RefuseManagerWindow({ onClose, onRefuse }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Refuse Request</h2>
        <p>Are you sure you want to refuse this request?</p>
        <button onClick={onRefuse}>Send</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default RefuseManagerWindow;
