import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UploadPhoto = () => {
  const [photo, setPhoto] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [showFile, setShowFile] = useState(false);
  const { id } = useParams();

  // שליפת תמונות מהשרת כאשר הקומפוננט נטען
  useEffect(() => {
    fetch(`http://localhost:3000/photos`)
      .then((res) => res.json())
      .then((data) => {
        setGallery(data);
      })
      .catch((error) => console.error('Error fetching photos:', error));
  }, []);

  // פונקציה לטיפול בהוספת תמונה
  const handleAddClick = async (e) => {
    e.preventDefault();
    setShowFile(false);
    let formData = new FormData();
    formData.append("photo", photo);
    formData.append('id', id);

    try {
      const response = await fetch("http://localhost:3000/photos", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const resData = await response.json();
      console.log(resData);
      setGallery([...gallery, resData]); // עדכון הגלריה לאחר הוספת תמונה
    } catch (err) {
      console.error("Error uploading the photo:", err.message);
    }
  }

  return (
    <>
      <button onClick={() => setShowFile(true)}>add a photo</button>
      {showFile && (
        <div className="form-group">
          <input
            type="file"
            name="photo"
            className="form-control"
            onChange={(e) => setPhoto(e.target.files[0])}
            required
          />
          <button onClick={handleAddClick}>add</button>
        </div>
      )}
      {/* <div className="gallery">
        {gallery.map((photo) => (
          <img key={photo.photoID} src={`http://localhost:3000/${photo.photo}`} alt="gallery photo" />
        ))}
      </div> */}
    </>
  );
}

export default UploadPhoto;
