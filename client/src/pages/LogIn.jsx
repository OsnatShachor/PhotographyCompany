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
  const [formData, setFormData] = useState({})
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
        body =
        {
          email: formData.email,
          password: formData.password,
          roleID: roleID,
          photographerId: photographer.userID
        };
        break;
      default:
        body =
        {
          email: formData.email,
          password: formData.password,
          roleID: roleID,
          photographerId: 0
        };
        break;
    }
    const request = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)

    };

    fetch(`http://localhost:3000/users/logIn`, request)
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => { throw new Error(error.error); });
        }
        return res.json();
      })
      .then(data => {
        setUser(data);
        if (data.roleID == 3) {
          alert("You entered successfully")
          navigate(`/photographer/${photographer.userID}`, { state: { photographer } });
        }
        else if (data.roleID == 1) {
          alert("You entered successfully")
          navigate('/maneger');
        }
        else {
          alert("You entered successfully")
          navigate('/');
        }
      })
      .catch(error => {
        alert(error.message);
      });
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
