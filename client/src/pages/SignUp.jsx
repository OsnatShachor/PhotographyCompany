import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from '../App';
import '../CSS/Registation.css';

function SignUp() {
    const context = useContext(UserContext);
    const { user, setUser } = context;
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const roleID = location.state?.roleID;

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    function checkUser(e) {
        e.preventDefault();
        if (formData.password == formData.verifyPassword) {
            alert('Passwords do not match.');
        }
        else {
            const request = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: formData.userName,
                    email: formData.email,
                    phone: formData.phone,
                    roleID: roleID,
                    password: formData.password
                })
            };


            fetch('http://localhost:3000/users/signUp',request )
                .then(response => {
                    console.log("response "+response);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setUser(data);
                    navigate('/Request');
                })
                .catch(error => {
                    console.error('Error making POST request:', error);
                });
        }
    }

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
                <div className="content" id="signUpForm">
                    <h1>Sign-Up</h1>
                    <input type="text" className="input" name="userName" placeholder="User Name" onChange={handleChange}></input>
                    <input type="text" className="input" name="email" placeholder="Email" onChange={handleChange}></input>
                    <input type="text" className="input" name="phone" placeholder="Phone Number" onChange={handleChange}></input>

                    <div className="password">
                        <input type="password" className="input" name="password" placeholder="Set A Password" onChange={handleChange} required></input>

                        <input type="password" className="input" name="verify-password" placeholder="Verify-Password" onChange={handleChange} required></input>
                    </div>

                    <button id="button-save" onClick={(e) => checkUser(e)}>GET STARTED</button>
                </div>

            </form>
        </div>
    )

}
export default SignUp