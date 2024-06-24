import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../App';
import '../CSS/Registation.css';

function LogIn() {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { user, setUser } = context;
  const [formData, setFormData] = useState({})
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  const handleLogInButton = () => {
      // const { email, password } = req.body;
      //   if (!email || !password) {
      //       console.error("Missing email or password");
      //       return res.status(400).json({ error: "Email and password are required" });
      //   }
    const request = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: formData.email, password: formData.password })
    };

    fetch(`http://localhost:3000/users/logIn`, request)
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => { throw new Error(error.error); });
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          setUser(data);
          alert ("You entered successfully")
          navigate("/");
        }
      })
      .catch(error => {
        alert(error.message);
      });
  };
  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div>
      <div className="onTopBtn">
        <button onClick={handleHomeClick}>Home page</button>
      </div>
      <form id="form">
        <ul id="tabs" className="register-buttons active">
          <li className="tab active">
            <Link to="/SignUp" className="link-btn">Sign Up</Link>
          </li>
          <li className="tab">
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
