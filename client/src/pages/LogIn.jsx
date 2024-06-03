import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App.jsx";
import '../CSS/Registation.css';

function LogIn() {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogInButton = () => {

  //   setUser({ userName });
  //   navigate('/logIn');
  // };
  const handleHomeClick = () => {
    navigate('/');
  };
  return (
    <div>
      <div className="Sign-up-buttons">
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
              className="input" id="userName" onChange={(e) => setUserName(e.target.value)} value={userName} type="text" placeholder="UserName" required
            />
          </div>
          <div className="User-fill">
            <input
              className="input" onChange={(e) => setPassword(e.target.value)} value={password} id="userPassword" type="password" placeholder="Password" required
            />
          </div>
          <button
            type="button" id="button-save"> LOG-IN</button>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
