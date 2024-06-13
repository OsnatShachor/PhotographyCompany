import React from "react";
import { useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from "../App.jsx"
import "../CSS/Request.css"

function Request() {
  const context = useContext(UserContext);
  const { user, setUser } = context;
  const [fillRequest, setFillRequest] = useState('');
  const { id } = useParams();
  // const location = useLocation();
  const navigate = useNavigate();
  // const photographer = location.state.photographer;
  const handleRequestButton = (e) => {
    e.preventDefault(); // חשוב למנוע את הברירת המחדל של הטופס
    // if (!request) {
    //   alert('Please fill in all fields.');
    //   return;
    // }

    const request = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        photographerID:user.userId,
        request: fillRequest,
        statusID: 1
      })
    };

    fetch('http://localhost:3000/requests', request)
      .then(response => {
        //   console.log("response " + response);
        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }
        return response.json();
      })
      .then(() => {
        console.log("data sata");
        alert("Your request has been successfully sent")
        navigate('/');
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