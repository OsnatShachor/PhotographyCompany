import React, { useState, useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import PhotoOnScreen from '../components/PhotoOnScreen';
import { UserContext } from '../App';

const UploadPhoto = () => {
  const [photo, setPhoto] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [showFile, setShowFile] = useState(false);
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const photographer = user;
  
  // Fetch photos from the server when component mounts
  useEffect(() => {
    getAllPhotos()
  }, []);
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
        // Ensure the URLs are correctly formatted for the client
        const formattedData = data.map(photo => ({
          ...photo,
          url_photo: `http://localhost:3000/${photo.url_photo.replace(/\\/g, '/')}`
        }));
        setGallery(formattedData);
      })
      .catch((error) => console.error('Error fetching photos:', error));
  }
  // Function to handle photo upload
  const handleAddClick = async (e) => {
    e.preventDefault();
    setShowFile(false);
    let formData = new FormData();
    formData.append("photo", photo);

    try {
      const response = await fetch(`http://localhost:3000/photos/photos/${id}`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const resData = await response.json();
      // Update gallery with the newly uploaded photo
      const formattedPhoto = {
        ...resData,
        url_photo: `http://localhost:3000/${resData.url_photo.replace(/\\/g, '/')}`
      };
      setGallery([...gallery, formattedPhoto]);
    } catch (err) {
      console.error("Error uploading the photo:", err.message);
    }
  }
  const handleDisConnectionClick = () => {
    navigate(`/YO/photographer/${user.userID}`, { state: { photographer } });
    setUser({});
  };

  const handleConnectionClick = () => {
    navigate('/YO/SignUp', { state: { roleID, photographer } });
  };

  const handleHomeClick = () => {
    navigate(`/YO/photographerManagement/${user.userID}`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRequestClick = () => {
    navigate('/YO/Request', { state: { user } });
  };
  return (
    <>
      <div className="onTopBtn">
        <button onClick={handleHomeClick}>Home Page</button>
        <button onClick={handleRequestClick}>Sent Request to YO-Photography</button>
        {!(user && user.userID) && (<button onClick={handleConnectionClick}>Connection</button>)}
        {(user && user.userID) && (<button onClick={handleDisConnectionClick}>DisConnection</button>)}
        <button onClick={handleBackClick}>Back</button>
      </div>
      <button onClick={() => setShowFile(true)}>Add a photo</button>
      {showFile && (
        <div className="form-group">
          <input
            type="file"
            name="photo"
            className="form-control"
            onChange={(e) => setPhoto(e.target.files[0])}
            required
          />
          <button onClick={handleAddClick}>Add</button>
        </div>
      )}

      {/* Gallery section */}
      <div className="gallery">
        {gallery.length > 0 ? (
          gallery.map((photo) => (
            <PhotoOnScreen key={photo.photoID} src={photo.url_photo} alt={`Photo ${photo.photoID}`} />
          ))
        ) : (
          <p>No photos available</p>
        )}
      </div>
    </>
  );
}

export default UploadPhoto;
