import React, { useState } from 'react';

const UploadPhoto = () => {

  const [image, setImage] = useState(null);
  const [showFile, setShowFile] = useState(false)
  useEffect(() => {
    fetch(`http://localhost:3000/images`)
        .then((res) => res.json())
        .then((data) => {
          setImage([...data]);
        })
        .catch((error) => console.error('Error fetching photos:', error));
}, []);

  const handleAddClick = async (e) => {
    e.preventDefault();
    setShowFile(false)
    let formData = new FormData();
    formData.append("image", image);
    postNewObject("gallery", formData)
    try {
      const response = await fetch("http://localhost:3000/images", {
        method: "POST",
        body: formData
      });

      const resData = await response.json();
      console.log(resData);
    } catch (err) {
      console.error("Error uploading the image", err);
    }
  }

  return (
    <>
      <button onClick={handleAddClick}>add a photo</button>
      {showFile && <div className="form-group">
        <input type="file" name="image" className="form-control" onChange={(e) => { setShowFile(true), setImage(e.target.files[0]) }} required />
      </div>}
    </>
  )
}

export default UploadPhoto;

//       import React, {useEffect, useState} from 'react';
//       import {useParams} from 'react-router-dom';
//       import '../css/public.css';  // Make sure the path is correct based on your folder structure
//       import {postNewObject} from '../../Fetch';

//       function Gallery() {
//     const [file, setFile] = useState();
//       const [showAdd, setShowAdd] = useState(false);
//       const [photos, setPhotos] = useState([]);
//       const [openConfirmationWindow, setOpenConfirmationWindow] = useState(false);
//       const [idDelPhoto, setIdDelPhoto] = useState(0);
//       const params = useParams();

//     useEffect(() => {
//         fetch(`http://localhost:3000/gallery`)
//           .then((res) => res.json())
//           .then((data) => {
//             setPhotos([...data]);
//           })
//           .catch((error) => console.error('Error fetching photos:', error));
//     }, []);

//     const handleFile = (e) => {
//         setFile(e.target.files[0]);
//       setShowAdd(true)
//     }

//     const handleUpload = () => {
//         setShowAdd(false)
//         const formData = new FormData();
//       formData.append('image', file);
//       postNewObject("gallery", formData)
//       fetch('http://localhost:3000/gallery', {
//         method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       'authorization':localStorage.getItem("token"),
//              },
//       body: formData,
//         })
//         .then(response => response.json())
//         .then(data => {
//         setPhotos([...data]);
//         })
//         .catch(error => console.error('Error adding photo:', error));
//     }

//     const handleDeletePhoto = () => {
//         fetch(`http://localhost:3000/gallery/${idDelPhoto}`, {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//             'authorization': localStorage.getItem("token"),
//           },
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             setPhotos([...data]);
//             setOpenConfirmationWindow(false);
//           })
//           .catch((error) => console.error('Error deleting photo:', error));
//     };

//     const photoElements = photos.map((photo) => (
//       <div key={photo.id} className="photo-tile">
//         <div className="photo-info">
//           <img src={`http://localhost:3000/images/${photo.imageUrl}`} alt="Not Found" onDoubleClick={() => { setOpenConfirmationWindow(true); setIdDelPhoto(photo.id); }} />
//         </div>
//       </div>
//       ));

//       return (
//       <div>
//         <div>
//           <h1>גלריה</h1>
//           <input type="file" onChange={handleFile} />
//           {showAdd && <button onClick={handleUpload}>הוספת תמונה</button>}
//         </div>
//         {photoElements}
//         {openConfirmationWindow && (
//           <div className="modal">
//             <div className="confirmation-text">Do you really want to delete this photo?</div>
//             <div className="button-container">
//               <button className="cancel-button" onClick={() => setOpenConfirmationWindow(false)}>Cancel</button>
//               <button className="confirmation-button" onClick={handleDeletePhoto}>Delete</button>
//             </div>
//           </div>
//         )}
//       </div>
//       );
// }

//       export default Gallery;