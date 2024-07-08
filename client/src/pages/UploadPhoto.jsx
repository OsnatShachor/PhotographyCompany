import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PhotoOnScreen from '../components/PhotoOnScreen';
import { UserContext } from '../App';
import '../CSS/UploadPhoto.css'; // Import CSS for styling

const UploadPhoto = () => {
  const [photo, setPhoto] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [showFile, setShowFile] = useState(false);
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Fetch photos from the server when component mounts
  useEffect(() => {
    getAllPhotos();
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
        const formattedData = data.map(photo => ({
          ...photo,
          url_photo: `http://localhost:3000/${photo.url_photo.replace(/\\/g, '/')}`
        }));
        setGallery(formattedData);
      })
      .catch((error) => console.error('Error fetching photos:', error));
  };

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
      const formattedPhoto = {
        ...resData,
        url_photo: `http://localhost:3000/${resData.url_photo.replace(/\\/g, '/')}`
      };
      setGallery([...gallery, formattedPhoto]);
    } catch (err) {
      console.error("Error uploading the photo:", err.message);
    }
  };

  const handleDeleteClick = async () => {
    const accessToken = sessionStorage.getItem("accessToken");

    try {
      await Promise.all(selectedPhotos.map(async (photoId) => {
        const response = await fetch(`http://localhost:3000/photos/photos/${photoId}`, {
          method: "DELETE",
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
      }));

      setGallery(gallery.filter(photo => !selectedPhotos.includes(photo.photoID)));
      setSelectedPhotos([]);
    } catch (err) {
      console.error("Error deleting photos:", err.message);
    }
  };

  const toggleSelectPhoto = (photoID) => {
    setSelectedPhotos((prevSelected) =>
      prevSelected.includes(photoID)
        ? prevSelected.filter(id => id !== photoID)
        : [...prevSelected, photoID]
    );
  };

  const handleDisConnectionClick = () => {
    navigate(`/YO/photographer/${user.userID}`, { state: { photographer: user } });
    setUser({});
  };

  const handleConnectionClick = () => {
    navigate('/YO/SignUp', { state: { roleID: 1, photographer: user } });
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
      <h1 className="h1Title">Add Photos</h1>
      <div className="upload-section">
        <button className="add-photo-btn" onClick={() => setShowFile(true)}>Add a photo</button>
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
      </div>
      {selectedPhotos.length > 0 && (
        <button onClick={handleDeleteClick}>Delete Selected Photos</button>
      )}
      {/* Gallery section */}
      <div className="gallery">
        {gallery.length > 0 ? (
          gallery.map((photo) => (
            <div key={photo.photoID} onClick={() => toggleSelectPhoto(photo.photoID)} className={`photo-item ${selectedPhotos.includes(photo.photoID) ? 'selected' : ''}`}>
              <PhotoOnScreen src={photo.url_photo} alt={`Photo ${photo.photoID}`} />
            </div>
          ))
        ) : (
          <p>No photos available</p>
        )}
      </div>
    </>
  );
}

export default UploadPhoto;
