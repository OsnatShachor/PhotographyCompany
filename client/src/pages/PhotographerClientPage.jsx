import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams, Outlet } from 'react-router-dom';
import { UserContext } from '../App';
import "../CSS/PhotographerPage.css";

function PhotographerClientPage() {
  const context = useContext(UserContext);
  const { user, setUser } = context;
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [aboutMe, setAboutMe] = useState("");
  const roleID = 3;
  const [photographer, setPhotographer] = useState(null); // Adding state variable for photographer

  useEffect(() => {
    if (location.state && location.state.photographer) {
      setPhotographer(location.state.photographer);
      getInformation(location.state.photographer.userID);
      console.log(JSON.stringify(user));
    } else {
      getPhotographer(id);
    }
  }, [id, location.state]);

  const handleDisconnectionClick = () => {
    setUser({});
  };

  const handleConnectionClick = () => {
    navigate('/SignUp', { state: { roleID, photographer } });
  };

  const handlePriceListClick = () => {
    navigate(`/photographer/${id}/PriceList`, { state: { photographer } });
  };

  const handlePrivateAreaClick = () => {
    if (user &&(user.userId||user.userID)) {
      navigate(`/photographer/${id}/PrivateArea`, { state: { photographer } });
    }else {
      navigate('/SignUp', { state: { roleID, photographer } });
    }
  };

  const handleOrderClick = () => {
    if (user &&(user.userId||user.userID)) {
      navigate(`/photographer/${id}/order`, { state: { photographer } });
    } else {
      navigate('/SignUp', { state: { roleID, photographer } });
    }
  };

  const getInformation = async (userID) => {
    try {
      const response = await fetch(`http://localhost:3000/aboutMe/${userID}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const aboutMeData = await response.json();
      setAboutMe(aboutMeData.aboutMe);
    } catch (error) {
      console.error('Error fetching about me:', error);
    }
  };
//הבאת הצלם שהאתר שלו
  const getPhotographer = async (userID) => {
    try {
      const data = await fetch(`http://localhost:3000/users/${userID}`);
      const photographerData = await data.json();
      setPhotographer(photographerData[0]);
      getInformation(userID);
    } catch (error) {
      console.error("Error fetching photographer:", error);
    }
  };

  if (!photographer) {
    return null; // Return early if photographer data is not yet loaded
  }

  return (
    <div>
      <div className="onTopBtn">
        <button onClick={handleConnectionClick}>Connection</button>
        <button onClick={handleDisconnectionClick}>Disconnection</button>
        <button onClick={handlePrivateAreaClick}>Private Area</button>
      </div>
      {user.userName && <h3>Hello {user.userName}</h3>}

      <h1>{photographer.userName}</h1>
      <div id="photographers">
        <button className="btnPhotographer" onClick={handlePriceListClick}>Price List</button>
        <button className="btnPhotographer" onClick={handleOrderClick}>Order a Photo Day</button>
      </div>
      <div id="aboutMe">
        <p>{aboutMe}</p>
      </div>
      <Outlet />
    </div>
  );
}

export default PhotographerClientPage;
