import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from '../App';

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
        const data = await fetch(`http://localhost:3000/aboutMe/${id}`);
        const aboutMeData = await data.json();
        setAboutMe(aboutMeData.aboutMe);
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

    const handleSitePolicyClick = async () => { };
    const handlePriceListClick = () => {
        navigate(`/photographer/${id}/PriceList`, { state: { user } });    }


    const handleOrderClick = async () => { };

    const handleAddingPhotosClick = async () => { };

    const handleSaveCategory = async (category) => {
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

    return (
        <>
            <div className="onTopBtn">
                <button onClick={handleSitePolicyClick}>Your site policy</button>
                <button onClick={handleDisconnectionClick}>Disconnection</button>
                <button onClick={handleOrderClick}>Order management</button>
            </div>
            <h1>{user.userName}</h1>
            <div id="photographers">
                <button className="btnPhotographer" onClick={handleAddingPhotosClick}>Adding photos to the gallery</button>
                <button className="btnPhotographer" onClick={handlePriceListClick}>Price List</button>
                <button className="btnPhotographer" onClick={handleOrderClick}>Order a Photo Day</button>
            </div>
            <input
                type="text"
                value={aboutMe}
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
