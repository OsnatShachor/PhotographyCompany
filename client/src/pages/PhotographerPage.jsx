import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Link, useParams } from 'react-router-dom';
import { UserContext } from '../App';
import "../CSS/PhotographerPage.css"

function PhotographerPage() {
  const context = useContext(UserContext);
  const { user, setUser } = context;
  const location = useLocation();
  const navigate = useNavigate();
  const photographer = location.state?.photographer;
  const { id } = useParams();
  const [aboutMe, setAboutMe] = useState(" ");
  const roleID = 3;

  useEffect(() => {
    if (photographer) {
      getInformation();
    }
  }, [photographer]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleDisConnectionClick = () => {
    setUser({});
  };

  const handleConnectionClick = () => {
    navigate('/SignUp', { state: { roleID, photographer } });
  };

  const handlePriceListClick = () => {
    navigate(`/PriceList/${photographer.userID}`, { state: { photographer } });
  };

  const handleOrderClick = () => {
    navigate(`/order`, { state: { photographer } });
  };

  const getInformation = async () => {
    if (photographer && photographer.userID) {
      const data = await fetch(`http://localhost:3000/aboutMe/${photographer.userID}`);
      const aboutMe = await data.json();
      console.log(aboutMe);
      setAboutMe(aboutMe.aboutMe);
    }
  };

  if (!photographer) {
    return <div>Photographer not found</div>;
  }

  return (
    <div>
      <div className="onTopBtn">
        <button onClick={handleConnectionClick}>Connection</button>
        <button onClick={handleDisConnectionClick}>Disconnection</button>
      </div>
      {(user.userName != null) && (<h3>hello {user.userName}</h3>)}

      <h1>{photographer.userName}</h1>
      <div id="photographers">
        <button className="btnPhotographer" onClick={handlePriceListClick}>Price List</button>
        <button className="btnPhotographer" onClick={handleOrderClick}>Order a photo day</button>
      </div>
      <div id="aboutMe">
        <p >{aboutMe}</p>
      </div>

    </div>
  );
}

export default PhotographerPage;
