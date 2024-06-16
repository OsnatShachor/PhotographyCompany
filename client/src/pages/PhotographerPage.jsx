import {React,useState,useEffect} from "react";
import {useParams, useLocation, useNavigate} from 'react-router-dom';

function PhotographerPage() {
  const {photographerId} = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const photographer = location.state.photographer;
  const [aboutMe,setAboutMe]=useState(" ")
  useEffect(() => {
    getInformation();
  }, []);

  const handleBackClick = () => {
    navigate('/');
  };
  const handlePriceListClick = () => {
    navigate(`/PriceList/${photographer.userID}`, { state: { photographer } });
  };
  const getInformation = async () => {
    const data = await fetch(`http://localhost:3000/aboutMe/${photographerId}`);
    const aboutMe = await data.json();
    setAboutMe(aboutMe);
    console.log(aboutMe)
  };
  return (
    <div>
      <h1>{photographer.userName}</h1>
      <p>Photographer ID: {photographerId}</p>
      <button className="btnPhotographer" onClick={handlePriceListClick}>PriceList</button>
      <button className="btnPhotographer" onClick={handleBackClick}>Booking a photo day</button>
      <p>About me:{aboutMe.aboutME}</p>
      <button className="btnPhotographer" onClick={handleBackClick}>Back to the home page</button>
    </div>
  );
}

export default PhotographerPage;

