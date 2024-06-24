import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PhotographerWebsite from "../components/PhotographerWebsite";
import '../CSS/WelcomePage.css';
import { UserContext } from '../App';

function WelcomePage() {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const { user, setUser } = context;
    const [photographersArray, setPhotographersArray] = useState([]);
    const roleID = 4;

    const getAllPhotographers = async () => {
        const data = await fetch(`http://localhost:3000`);
        const photographers = await data.json();
        setPhotographersArray(photographers);
    };

    useEffect(() => {
        getAllPhotographers();
    }, []);
    const handleSidnOutClick = () => {
        navigate('/');
    }

    const handleOrdersClick =async () => {

    }

    return (
        <div id="welcomePage">
            <div className="onTopBtn">
                <button onClick={handleSidnOutClick}>SignOut</button>
            </div>
            <button onClick={handleOrdersClick}></button>
            <h1 id="mainTitle">Welcome to our community of photographers!</h1>

        </div>
    );
}

export default WelcomePage;
