import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../App.jsx"
import '../CSS/Registation.css'

function SignUp() {

    const { user, setUser } = useContext(AppContext)
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(() => {
            return {
                ...formData,
                [name]: value
            }
        })
    }
    function checkUser(e) {
        e.preventDefault()
        const request = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: formData.username, password: formData.password })
        }
        fetch(`http://localhost:3000/photographers/signUp`, request)
            .then(res => {
                if (res.status != 200) {
                    alert("Exist user")
                    navigate("/login")
                }
                else
                    return res.json
            })//maybe remove then
            .then(data => {
                if (data) {
                    setUser(formData)
                }
            })
            .catch(error => console.error("Error fetching data from server:", error))
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
                    <input type="text" className="input" placeholder="User Name" onChange={handleChange}></input>
                    <input type="text" className="input" placeholder="Email" onChange={handleChange}></input>
                    <input type="text" className="input" placeholder="Phone Number" onChange={handleChange}></input>

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