import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from '../App';
import '../CSS/Registation.css';

function LogIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(UserContext);
  const { user, setUser } = context;
  const roleID = location.state?.roleID;
  const photographer = location.state?.photographer;
  const [formData, setFormData] = useState({});
  let body = {};

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  const handleLogInButton = () => {
    if (!formData.email || !formData.password) {
      alert("Must Fill All Details");
      return;
    }
    switch (roleID) {
      case 3:
        body = {
          email: formData.email,
          password: formData.password,
          roleID: roleID,
          photographerId: photographer?.userID || 0 // תוודא שיש ערך תקין
        };
        break;
      default:
        body = {
          email: formData.email,
          password: formData.password,
          roleID: roleID,
          photographerId: 0
        };
        break;
    }
    const request = {
      method: "POST",
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    fetch(`http://localhost:3000/users/logIn`, request)
      .then(res => {
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Unauthorized");
          } else {
            return res.json().then(error => { throw new Error(error.error); });
          }
        }
        return res.json();
      })
      .then(data => {
        setUser(data);
        if (data.roleID === 3) {//לקוח מעביר לעמוד של הצלם אליו נכנס
          alert("You entered successfully")
          navigate(`/photographer/${photographer.userID}`, { state: { photographer: photographer } });
        } 
        else if (data.roleID === 1) {// מנהל
          console.log(JSON.stringify(data));
          alert("You entered successfully")
          navigate('/manager');
        } 
        else if (data.roleID === 2) {// צלם - בודק אם הוא פעיל
          checkIfPhotographerActive(data.userID).then(isActive => {
            if (isActive) {
              alert("You entered successfully")
              navigate(`/photographerManagement/${data.userID}`);
            }else{
              alert("You entered successfully")
              navigate(`/`);
            }
          });
        }
      })
      .catch(error => {
        if (error.message === "Unauthorized") {
          alert("Unauthorized: Incorrect email or password");
        } else {
          alert(error.message);
        }
      });
  };

  const checkIfPhotographerActive = async (userID) => {
    try {
      const response = await fetch(`http://localhost:3000/photographer/${userID}`);
      const data = await response.json();
      return data.isActive;
    } catch (error) {
      console.error('Failed to check if photographer is active:', error);
      return false;
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="onTopBtn">
        <button onClick={handleBackClick}>Back</button>
      </div>
      <form id="form">
        <ul id="tabs" className="register-buttons active">
          <li className="tab">
            <Link to="/SignUp" state={{ roleID, photographer }} className="link-btn">Sign Up</Link>
          </li>
          <li className="tab active">
            <Link to="/logIn" className="link-btn">Log In</Link>
          </li>
        </ul>
        <div>
          <h1>Welcome Back!</h1>
          <div className="User-fill">
            <input
              className="input" id="userEmail" onChange={handleChange} type="text" placeholder="userEmail" name="email" required
            />
          </div>
          <div className="User-fill">
            <input
              className="input" onChange={handleChange} id="userPassword" type="password" placeholder="Password" name="password" required
            />
          </div>
          <button
            type="button" id="button-save" onClick={handleLogInButton}>LOG-IN</button>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
