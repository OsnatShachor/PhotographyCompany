import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from '../App';
import '../CSS/PhotographerManagement.css'
function PhotographerPage() {
    const navigate = useNavigate();
    const [aboutMe, setAboutMe] = useState('');
    const [enableUpdateAbout, setEnableUpdateAbout] = useState(false);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const { id } = useParams();
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (!user.userID) {
            navigate('/');
        }
        getAbout();
    }, []);

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
            const response = await fetch(`http://localhost:3000/photographer/${id}/update-about`, {
                method: 'POST',
                headers: {
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

    const handleDisconnectionClick = () => {
        setUser({});
        navigate(`/photographer/${user.userID}`, { state: { user } });
    };

    const handlePriceListClick = () => {
        navigate(`/photographer/${id}/PriceList`, { state: { user } });    }


    const handleOrderClick = async () => { };

    const handleAddingPhotosClick = async () => { 
        navigate(`/photographer/${id}/PhotoManagement`)    
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

    const handleRequestClick= ()=>{
        navigate('/Request');
    }
    return (
        <>
            <div className="onTopBtn">
                <button onClick={handleDisconnectionClick}>Disconnection</button>
                <button onClick={handleOrderClick}>Order management</button>
                <button onClick={handleRequestClick}>Sent Request to YO-Photography</button>

            </div>
            <h1>{user.userName}</h1>
            <div id="photographers">
                <button className="btnPhotographer" onClick={handleAddingPhotosClick}>Add photos to the gallery</button>
                <button className="btnPhotographer" onClick={handlePriceListClick}>Price List</button>
            </div>
            <textarea
                type="text"
                value={aboutMe}
                id="inputAbout"
                className="input"
                placeholder="About Me"
                onChange={(e) => {
                    setAboutMe(e.target.value);
                    setEnableUpdateAbout(true);
                }}
            />
            {enableUpdateAbout && (<button onClick={handleUpdateAboutClick}>Update</button>)}


        </>
    );
}

export default PhotographerPage;
