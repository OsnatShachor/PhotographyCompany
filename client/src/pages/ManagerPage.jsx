import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RequestOnScreen from "../components/RequestOnScreen";
import '../CSS/WelcomePage.css';
import { UserContext } from '../App';

function ManagerPage() {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const [allRequests, setAllRequests] = useState([]);
    const { user, setUser } = context;

    useEffect(() => {
        getAllRequest();
    }, []);

    const getAllRequest = async () => {
        try {
            const response = await fetch(`http://localhost:3000/requests/requests`);
            const allRequest = await response.json();
            setAllRequests(allRequest);
        } catch (error) {
            console.error('Error fetching waiting requests:', error);
        }
    };
    const handleBackClick = () => {
        navigate(-1);
    }
    const handleDisConnectionClick = () => {
        setUser({});
        navigate('/');
    };
    return (
        <>
            <div className="onTopBtn">
                <button onClick={handleDisConnectionClick}>Connection</button>
                <button onClick={handleBackClick}>Back</button>
            </div>
            <div id="space"></div>
            <div id="waitingRequests">
                {allRequests.map((request, index) => (
                    <RequestOnScreen key={index} request={request} />
                ))}
            </div>
        </>
    );
}

export default ManagerPage;
