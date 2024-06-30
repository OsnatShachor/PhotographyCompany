import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function PhotographerPage() {
    const [showModal, setShowModal] = useState(false);
    const [aboutMe, setAboutMe] = useState('');
    const [enableUpdate, setEnableUpdate] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        getAbout();
    }, []);

    const getAbout = async () => {
        const data = await fetch(`http://localhost:3000/aboutMe/${id}`);
        console.log(data)
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
                body: JSON.stringify({ id, aboutMe }), // הוספת id
            });
            setEnableUpdate(false);
            if (!response.ok) {
                throw new Error('Failed to update request status');
            }
        } catch (error) {
            console.error('Error updating request status:', error);
        }
    };

    const handleSitePolicyClick = async () => { };

    const handlePriceListClick = async () => { };

    const handleOrderClick = async () => { };

    const handleAddingPhotosClick = async () => { };

    return (
        <>
            <button onClick={handleSitePolicyClick}>Your site policy</button>
            <button onClick={handlePriceListClick}>Price List</button>
            <button onClick={handleOrderClick}>Order management</button>
            <button onClick={handleAddingPhotosClick}>Adding photos to the gallery</button>
            <input
                type="text"
                value={aboutMe}
                className="input"
                placeholder="About Me"
                onChange={(e) => {
                    setAboutMe(e.target.value);
                    setEnableUpdate(true);
                }}
            />
            {enableUpdate && (<button onClick={handleUpdateAboutClick}>Update</button>)}
        </>
    );
}

export default PhotographerPage;
