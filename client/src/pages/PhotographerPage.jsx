import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Link, useParams,Outlet  } from 'react-router-dom';
import { UserContext } from '../App';
import "../CSS/PhotographerPage.css"

function PhotographerPage() {
  const context = useContext(UserContext);
  const { user, setUser } = context;
  // const PhotographerContext = useContext(PhotographerContext);
  // const { photographer, setPhotographer } = context;
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
  //  const getPhotographer =async()=>{
  //   const data = await fetch(`http://localhost:3000/photographer/:id`);
  //   const photographers = await data.json();
  //   setPhotographersArray(photographers);
  // }
  const handleDisConnectionClick = () => {
    setUser({});
  };

  const handleConnectionClick = () => {
    navigate('/SignUp', { state: { roleID, photographer } });
  };

  const handlePriceListClick = () => {
    navigate(`/photographer/${id}/PriceList`, { state: { photographer } });
  };
  const handlePrivateAreaClick = () => {
    navigate(`/photographer/${id}/PrivateArea`, { state: { photographer } });
  };
  const handleOrderClick = () => {
    if (user && user.userId) {
      navigate(`/photographer/${id}/order`, { state: { photographer } });
    } else {
      navigate('/SignUp', { state: { roleID, photographer } });
    }
  };

  const getInformation = async () => {
    if (photographer && photographer.userID) {
      const data = await fetch(`http://localhost:3000/aboutMe/${photographer.userID}`);
      const aboutMe = await data.json();
      console.log(aboutMe);
      setAboutMe(aboutMe.aboutMe);
    }
  };

  return (
    <div>
      <div className="onTopBtn">
        <button onClick={handleConnectionClick}>Connection</button>
        <button onClick={handleDisConnectionClick}>Disconnection</button>
        <button onClick={handlePrivateAreaClick}>Private Area</button>

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
      <Outlet /> 
    </div>
  );
}

export default PhotographerPage;
