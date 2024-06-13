import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PhotographerWebsite from "../components/PhotographerWebsite";
import '../CSS/WelcomePage.css';
import { UserContext } from '../App';

function WelcomePage() {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { user, setUser } = context;
  const [photographersArray, setPhotographersArray] = useState([]);
  const roleID = 2;

  const getAllPhotographers = async () => {
    const data = await fetch(`http://localhost:3000`);
    const photographers = await data.json();
    setPhotographersArray(photographers);
  };

  useEffect(() => {
    getAllPhotographers();
  }, []);

  const handleSidnUpClick = () => {
    navigate('/SignUp', { state: { roleID } });
  };

  const handleLogInClick = () => {
    navigate('/LogIn');
  };

  const handleJoinClick = () => {
    if(user.userID){//אם מחובר משתמש
      navigate('/Request');
    }
    else{
      navigate('/SignUp', { state: { roleID } });
    }
  };

  return (
    <div id="welcomePage">
      <div className="onTopBtn">
        <button onClick={() => handleSidnUpClick(2)}>SignUp</button>
        <button onClick={handleLogInClick}>LogIn</button>
      </div>

      <h1 id="mainTitle">Welcome to our community of photographers!</h1>
      <div id="photographers">
        {photographersArray.map((photographer, index) => (
          <PhotographerWebsite key={index} photographer={photographer} />
        ))}
      </div>
      <button id="join" onClick={handleJoinClick}>
        Want to join our community of professional photographers? Click Here!
      </button>
    </div>
  );
}

export default WelcomePage;
