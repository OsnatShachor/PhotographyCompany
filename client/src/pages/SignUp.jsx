import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from '../App';
import '../CSS/Registation.css';

function SignUp() {
    const context = useContext(UserContext);
    const { user, setUser } = context;
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const roleID = location.state?.roleID;
    const photographer = location.state?.photographer;
    let body = {};

    const handleRegisterButton = (e) => {
        e.preventDefault();
        if (!userName || !email || !phone || !password || !verifyPassword) {
            alert('Please fill in all fields.');
            return;
        }
        if (password !== verifyPassword) {
            alert('Passwords do not match.');
            return;
        }

        switch (roleID) {
            case 3:
                body = {
                    userName: userName,
                    email: email,
                    phone: phone,
                    roleID: roleID,
                    password: password,
                    photographerId: photographer.userID
                };
                break;
            default:
                body = {
                    userName: userName,
                    email: email,
                    phone: phone,
                    roleID: roleID,
                    password: password,
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

        fetch('http://localhost:3000/users/signUp', request)
            .then(async (response) => {
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText);
                }
                const data = await response.json();
                sessionStorage.setItem("accessToken",data.accessToken)
                setUser(data.returnedUser);
                if (body.photographerId === 0) {
                    navigate('/Request');
                } else {
                    alert("You have successfully registered");
                    navigate(`/photographer/${photographer.userID}`, { state: { photographer } });
                }
            })
            .catch(error => {
                alert('Error making POST request: ' + error.message);
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
                    <li className="tab active">
                        <Link to="/SignUp" className="link-btn">Sign Up</Link>
                    </li>
                    <li className="tab">
                        <Link to="/logIn" state={{ photographer, roleID }} className="link-btn">Log In</Link>
                    </li>
                </ul>
                <div className="content" id="signUpForm">
                    <h1>Sign-Up</h1>
                    <input type="text" className="input" name="userName" placeholder="User Name" onChange={(e) => setUserName(e.target.value)} value={userName} />
                    <input type="text" className="input" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <input type="text" className="input" name="phone" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} value={phone} />

                    <div className="password">
                        <input type="password" className="input" name="password" placeholder="Set A Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                        <input type="password" className="input" name="verify-password" placeholder="Verify-Password" onChange={(e) => setVerifyPassword(e.target.value)} value={verifyPassword} required />
                    </div>

                    <button id="button-save" onClick={handleRegisterButton}>GET STARTED</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;
