import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PhotoOnScreen from '../components/PhotoOnScreen';

const UploadPhoto = () => {
  const [photo, setPhoto] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [showFile, setShowFile] = useState(false);
  const { id } = useParams();

  // Fetch photos from the server when component mounts
  // useEffect(() => {
  //   fetch(`http://localhost:3000/photos`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setGallery(data);
  //     })
  //     .catch((error) => console.error('Error fetching photos:', error));
  // }, []);

  // Function to handle photo upload
  const handleAddClick = async (e) => {
    e.preventDefault();
    setShowFile(false);
    let formData = new FormData();
    formData.append("photo", photo);

    try {
      const response = await fetch(`http://localhost:3000/photos/${id}`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const resData = await response.json();
      // Update gallery with the newly uploaded photo
      // const photo = { ...order, statusID };
      // const photos = gallery.map(g => g.orderID === order.orderID ? updatedOrder : g);
      setGallery([...gallery, resData]);
    } catch (err) {
      console.error("Error uploading the photo:", err.message);
    }
  }

  return (
    <>
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
