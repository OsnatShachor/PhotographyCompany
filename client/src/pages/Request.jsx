import React from "react";
import { useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from "../App.jsx"
import "../CSS/Request.css"

function Request() {
  const context = useContext(UserContext);
  const { user, setUser } = context;
  const [fillRequest, setFillRequest] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const photographer = location.state?.user;
  const handleRequestButton = (e) => {
    e.preventDefault();
    if (!fillRequest) {
      alert('Please fill in all fields');
      return;
    }

    const request = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        photographerID: user.userID,
        request: fillRequest,
        statusID: 1
      })
    };

    fetch('http://localhost:3000/request-to-manager', request)
      .then(response => {
        return response.json();
      })
      .then(() => {
        alert("Your request has been successfully sent")
        if (photographer) {
          navigate(`/photographerManagement/${photographer.userID}`);
        } else {
          navigate('/');
        }
      })
      .catch(error => {
        alert('Error making POST request:', error);
      });
  }
  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div>
      <form id="form">
        <div className="onTopBtn">
          <button onClick={handleBackClick}>Home page</button>
        </div>
        <h1>Sent Request</h1>
        <h3>{user.userName}, {user.email}, {user.phone}</h3>
        <textarea type="text" className="input" id="inputRequest" placeholder="Your Request" onChange={(e) => setFillRequest(e.target.value)} value={fillRequest} />
        <button id="button-save" onClick={handleRequestButton}>SEND YOUR REQUEST</button>

      </form>
    </div>
  );
}

export default Request;