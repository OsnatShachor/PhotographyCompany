import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from '../App';
import '../CSS/PhotographerManagement.css';
import PhotoOnScreen from '../components/PhotoOnScreen';

function PhotographerPage() {
    const navigate = useNavigate();
    const [aboutMe, setAboutMe] = useState('');
    const [enableUpdateAbout, setEnableUpdateAbout] = useState(false);
    const { id } = useParams();
    const { user, setUser } = useContext(UserContext);
    const [gallery, setGallery] = useState([]);

    useEffect(() => {
       
        getAbout();
        getAllPhotos();
    }, []);
    // useEffect(() => {
       
    //     if (!user.userID) {
    //         navigate('/');
    //     }
    // }, [user]);
    const getAbout = async () => {
        try {
            const response = await fetch(`http://localhost:3000/aboutMe/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const aboutMeData = await response.json();
            setAboutMe(aboutMeData.aboutMe || '');
        } catch (error) {
            console.error('Error fetching about me:', error);
        }
    };

    const handleUpdateAboutClick = async () => {
        try {
            const accessToken = sessionStorage.getItem("accessToken");

            const response = await fetch(`http://localhost:3000/photographer/${id}/update-about`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, aboutMe }),
            });
            setEnableUpdateAbout(false);
            if (!response.ok) {
                throw new Error('Failed to update request status');
            }
        } catch (error) {
            console.error('Error updating request status:', error);
        }
    };

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
        navigate(`/YO/photographer/${user.userID}`, { state: { user } });
    };

    const handlePriceListClick = () => {
        navigate(`/YO/photographer/${id}/PriceList`, { state: { user } });
    }

    const handleOrderClick = async () => {
        navigate(`/YO/photographer/${id}/PhotoManagement/orders`);
    };

    const handleAddingPhotosClick = async () => {
        navigate(`/YO/photographer/${id}/PhotoManagement`);
    };

    const handleUpdateCategory = async (category) => {
        try {
            const response = await fetch(`http://localhost:3000/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...category, photographerID: id }),
            });
            if (!response.ok) {
                throw new Error('Failed to add category');
            }
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleRequestClick = () => {
        navigate('/YO/Request', { state: { user } });
    };

    return (
        <div className="page-container">
            <div className="onTopBtn">
                <button onClick={handleDisconnectionClick}>Disconnection</button>
                <button onClick={handleOrderClick}>Handle Orders</button>
                <button onClick={handleRequestClick}>Sent Request to YO-Photography</button>
            </div>
            <p className="spaceBeforeTite"></p>
            <h1 className="h1Title">{user.userName}</h1>
            
            <div id="photographersBtn">
                <button className="btnPhotographer" onClick={handleAddingPhotosClick}>Add photos to the gallery</button>
                <button className="btnPhotographer" onClick={handlePriceListClick}>Price List</button>
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

            <div className="input-container">
                <textarea
                    value={aboutMe}
                    id="inputAbout"
                    placeholder="About Me"
                    onChange={(e) => {
                        setAboutMe(e.target.value);
                        setEnableUpdateAbout(true);
                    }}
                />
                {enableUpdateAbout && (
                    <button id="btnUpAbout" onClick={handleUpdateAboutClick}>Update</button>
                )}
            </div>
        </div>
    );
}

export default PhotographerPage;
