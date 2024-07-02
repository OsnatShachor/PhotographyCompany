import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RequestOnScreen from "../components/RequestOnScreen";
import '../CSS/WelcomePage.css';
import { UserContext } from '../App';

function ManagerPage() {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const [allRequests, setAllRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [filter, setFilter] = useState("all");
    const { user, setUser } = context;

    useEffect(() => {
        if (!user.userID) {
            navigate('/');
        }
        getAllRequest();
    }, []);

    useEffect(() => {
        filterRequests();
    }, [allRequests, filter]);

    const getAllRequest = async () => {
        try {
            const response = await fetch(`http://localhost:3000/requests/requests`);
            const allRequest = await response.json();
            setAllRequests(allRequest);
        } catch (error) {
            console.error('Error fetching waiting requests:', error);
        }
    };

    const filterRequests = () => {
        if (filter === "all") {
            setFilteredRequests(allRequests);
        } else if (filter === "Waiting") {
            setFilteredRequests(allRequests => allRequests.filter(request => ((request.statusID != 4) && (request.statusID != 5))));
        }
    };

    const handleRequestUpdate = async () => {
        await getAllRequest();
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleHomeClick = () => {
        navigate('/');
    };
    
    const handleDisConnectionClick = () => {
        setUser({});
        navigate('/');
    };

    const handleShowAllClick = () => {
        setFilter("all");
    };

    const handleShowWaitingClick = () => {
        setFilter("Waiting");
    };

    return (
        <>
            <div className="onTopBtn">
            <button onClick={handleHomeClick}>Home page</button>
            <button onClick={handleDisConnectionClick}>DisConnection</button>
                <button onClick={handleBackClick}>Back</button>
            </div>
            <div id="space">
                <br></br>
            </div>
            <div className="filterButtons">
                <button onClick={handleShowAllClick}>Show All Requests</button>
                <button onClick={handleShowWaitingClick}>Show Waiting Requests</button>
            </div>
            <div id="waitingRequests">
                {filteredRequests.map((request, index) => (
                    <RequestOnScreen key={index} request={request} onRequestUpdate={handleRequestUpdate} />
                ))}
            </div>
        </>
    );
}

export default ManagerPage;
