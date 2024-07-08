import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams, Outlet } from 'react-router-dom';
import { UserContext } from '../App';
import "../CSS/PhotographerPage.css";
import PhotoOnScreen from '../components/PhotoOnScreen';

function PhotographerClientPage() {
  const context = useContext(UserContext);
  const { user, setUser } = context;
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [aboutMe, setAboutMe] = useState("");
  const [gallery, setGallery] = useState([]);
  const roleID = 3;
  const [photographer, setPhotographer] = useState(null); // Adding state variable for photographer

  useEffect(() => {
    getAllPhotos()
  }, []);

  useEffect(() => {
    if (location.state && location.state.photographer) {
      setPhotographer(location.state?.photographer);
      getInformation(id);
      console.log(JSON.stringify(user));
    } else {
      getPhotographer(id);
    }
  }, [id, location.state]);

  
  const getAllPhotos = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
  
    fetch(`http://localhost:3000/photos/photos/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map(photo => ({
          ...photo,
          url_photo: `http://localhost:3000/${photo.url_photo.replace(/\\/g, '/')}`
        }));
        setGallery(formattedData);
      })
      .catch((error) => console.error('Error fetching photos:', error));
  };
  

  const handleDisconnectionClick = () => {
    setUser({});
  };

  const handleConnectionClick = () => {
    navigate('/YO/SignUp', { state: { roleID, photographer } });
  };

  const handlePriceListClick = () => {
    navigate(`/YO/photographer/${id}/PriceList`, { state: { photographer } });
  };

  const handlePrivateAreaClick = () => {
    if (user && (user.userID)) {
      navigate(`/YO/photographer/${id}/PrivateArea/${user.userID}`, { state: { photographer } });
    } else {
      navigate('/YO/SignUp', { state: { roleID, photographer } });
    }
  };

  const handleOrderClick = () => {
    if (user && (user.userID)) {
      navigate(`/YO/photographer/${id}/order`, { state: { photographer } });
    } else {
      navigate('/YO/SignUp', { state: { roleID, photographer } });
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
    <div className="page-container">
      <div className="onTopBtn">
       
        {(user && (user.userID)) ? (<button onClick={handleDisconnectionClick}>Disconnection</button>): <button onClick={handleConnectionClick}>Connection</button>}
        <button onClick={handlePrivateAreaClick}>Private Area</button>
      </div>
      <p className="spaceBeforeTite"></p>
      <h1 className="h1Title">{photographer.userName}</h1>
      {user.userName && <h3 id="helloh3">Hello {user.userName}</h3>}

      <div id="photographersBtn">
        <button className="btnPhotographer" onClick={handlePriceListClick}>Price List</button>
        <button className="btnPhotographer" onClick={handleOrderClick}>Order a Photo Day</button>
      </div>
      <div className="gallery">
        {gallery.length > 0 ? (
          gallery.map((photo) => (
            <PhotoOnScreen key={photo.photoID} src={photo.url_photo} alt={`Photo ${photo.photoID}`} />
          ))
        ) : (
          <p>No photos available</p>
        )}
      </div>
      <p className="spaceBeforeAbout"></p>
      <div id="aboutMe">
        <h4 id="abouth4">{aboutMe}</h4>
      </div>

      <Outlet />

    </div>
  );
}

export default PhotographerClientPage;
