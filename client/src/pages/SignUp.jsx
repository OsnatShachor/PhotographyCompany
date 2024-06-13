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

    const handleRegisterButton = (e) => {
        e.preventDefault(); // חשוב למנוע את הברירת המחדל של הטופס
        if (!userName || !email || !phone || !password || !verifyPassword) {
            alert('Please fill in all fields.');
            return;
        }
        if (password !== verifyPassword) {
            alert('Passwords do not match.');
            return;
        }
        
        const request = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                email: email,
                phone: phone,
                roleID: roleID,
                password: password
            })
        };

        fetch('http://localhost:3000/users/signUp', request)
            .then(response => {
              console.log("response " + response);
                if (response.status==400) {
                 alert(JSON.stringify(response.error))
                 navigate("/logIn");
               }
                return response.json();
            })
            .then(data => {
                console.log("data sata");
                setUser(data); 
                navigate('/Request');
            })
            .catch(error => {
                alert('Error making POST request:', error);
            });
    }

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
