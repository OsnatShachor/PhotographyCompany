import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import PhotographerWebsite from "../components/PhotographerWebsite"
import '../CSS/WelcomePage.css'


function WelcomePage() {
  const navigate = useNavigate();
  const [photographersArray, setPhotographersArray] = useState([]);


  const getAllPhotographers = async () => {
    const data = await fetch(`http://localhost:3000`);
    const photographers = await data.json();
    setPhotographersArray(photographers);
  }

  useEffect(() => {
    console.log("useEffect");
    getAllPhotographers();
  }, [])
  const handleSidnUpClick = () => {
    navigate('/SignUp');
  };
  const handleLogInClick = () => {
    navigate('/LogIn');
  };
  const handleJoinClick = () => {
    navigate('/Request');
  };
  return (

    <div id="welcomePage">
      <div className="Sign-up-buttons">
        <button onClick={handleSidnUpClick}>SignUp</button>
        <button onClick={handleLogInClick}>LogIn</button>
      </div>

      <h1 id="mainTitle">Welcome to our community of photographers!</h1>
      <div id="photographers">
        {photographersArray.map((photographer, index) => <PhotographerWebsite key={index} photographer={photographer} />)}
      </div>
      <button id="join" onClick={handleJoinClick}>Want to join our community of professional photographers? Click Here!</button>

    </div>
  )
}

export default WelcomePage
