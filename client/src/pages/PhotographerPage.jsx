import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Link, useParams } from 'react-router-dom';
import { UserContext } from '../App';

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
      setAboutMe(aboutMe);
    }
  };

  if (!photographer) {
    return <div>Photographer not found</div>;
  }

  return (
    <div>
      <div className="onTopBtn">
        <button className="btnPhotographer" onClick={handleConnectionClick}>connection</button>
        <button className="btnPhotographer" onClick={handleDisConnectionClick}>disconnection</button>
      </div>
      <h3>hello {user.userName}</h3>
      <h1>{photographer.userName}</h1>
      <button className="btnPhotographer" onClick={handlePriceListClick}>Price List</button>
      <button className="btnPhotographer" onClick={handleOrderClick}>Order a photo day</button>
      <p id="aboutMe">{JSON.stringify(aboutMe)}</p>
    </div>
  );
}

export default PhotographerPage;
