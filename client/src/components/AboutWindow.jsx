import React, { useState } from 'react';

function AboutWindow({ showModal, setShowModal, photographerID }) {
  const [aboutMe, setAboutMe] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/photographer/${photographerID}/update-about`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ photographerID, aboutMe }),
      });

      if (response.ok) {
        setShowModal(false);
        console.log('About me updated successfully');
      } else {
        console.error('Failed to update about me');
      }
    } catch (error) {
      console.error('Error updating about me:', error);
    }
  };

  return (
    showModal && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => setShowModal(false)}>&times;</span>
          <form onSubmit={handleSubmit}>
            <label htmlFor="aboutMe">About Me:</label>
            <textarea
              id="aboutMe"
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              required
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  );
}

export default AboutWindow;
