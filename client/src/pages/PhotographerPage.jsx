import {React,useState,useEffect} from "react";
import {useLocation, useNavigate} from 'react-router-dom';

function PhotographerPage() {
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
    const data = await fetch(`http://localhost:3000/aboutMe/${photographer.userID}`);
    const aboutMe = await data.json();
    console.log(aboutMe)
    setAboutMe(aboutMe);
  };
  return (
    <div>
      <h1>{photographer.userName}</h1>
      <p>Photographer ID: {photographer.userID}</p>
      <button className="btnPhotographer" onClick={handlePriceListClick}>PriceList</button>
      <button className="btnPhotographer" onClick={handleBackClick}>Booking a photo day</button>
     <div>{JSON.stringify(aboutMe)}</div>
   
      <button className="btnPhotographer" onClick={handleBackClick}>Back to the home page</button>
    </div>
  );
}

export default PhotographerPage;

