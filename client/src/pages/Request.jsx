import React from "react";
import { useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from "../App.jsx"
import "../CSS/Request.css"

function Request() {
  const context = useContext(UserContext);
  const { user, setUser } = context;
  const { id } = useParams();
  // const location = useLocation();
  const navigate = useNavigate();
  // const photographer = location.state.photographer;

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
        <h3>{user.userName} {user.email} {user.phone}</h3>
        {/* תוסיף כאן פרטים נוספים על הצלם */}
      </form>
    </div>
  );
}

export default Request;