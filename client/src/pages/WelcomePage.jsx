import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PhotographerButton from "../components/PhotographerButton";
import '../CSS/WelcomePage.css';
import { UserContext } from '../App';

function WelcomePage() {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { user, setUser } = context;
  const [photographersArray, setPhotographersArray] = useState([]);
  const roleID = 2;

  const getAllActivePhotographers = async () => {
    const data = await fetch(`http://localhost:3000`);
    console.log(data)
    const photographers = await data.json();
    setPhotographersArray(photographers);
  };

  useEffect(() => {
    getAllActivePhotographers();
  }, []);

  const handleSidnUpClick = () => {
    navigate('/SignUp', { state: { roleID } });
  };

  const handlrequestsClick = () => {
    navigate('/manager');
  };

  const handleJoinClick = () => {
    if (user.userID) {//אם מחובר משתמש
      navigate('/Request');
    }
    else {
      navigate('/SignUp', { state: { roleID } });
    }
  };
  const handleDisConnectionClick = () => {
    setUser({});
    navigate('/');
};
  return (
    <div id="welcomePage">
      <div className="onTopBtn">
        {!(user.userID)&&<button onClick={handleSidnUpClick}>Connection</button>}
        {(user && user.userID) &&(<button onClick={handleDisConnectionClick}>Disconnection</button>)}
        {(user.roleID == 1) && <button onClick={handlrequestsClick}>Handling requests</button>}
      </div>

      <h1 id="mainTitle">Welcome to our community of photographers!</h1>
      <div id="photographers">
        {photographersArray.map((photographer, index) => (
          <PhotographerButton key={index} photographer={photographer} />
        ))}
      </div>
      <button id="join" onClick={handleJoinClick}>
        Want to join our community of professional photographers? Click Here!
      </button>
    </div>
  );
}

export default WelcomePage;
