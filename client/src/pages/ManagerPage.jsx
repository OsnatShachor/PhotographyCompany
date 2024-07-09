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
    const [pendingCount, setPendingCount] = useState(0);
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
            const accessToken = sessionStorage.getItem("accessToken");
            const response = await fetch('http://localhost:3000/manager/manager', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                }
            });
            const allRequests = await response.json();
            console.log(allRequests);
            setAllRequests(allRequests);
            setPendingCount(allRequests.filter(request => request.statusID === 1).length);
        } catch (error) {
            setAllRequests([]);
            setPendingCount(0);
            alert('Error fetching waiting requests:', error);
        }
    };

    const filterRequests = () => {
        if (filter === "all") {
            setFilteredRequests(allRequests);
        } else if (filter === "Waiting") {
            setFilteredRequests(allRequests.filter(request => request.statusID !== 4 && request.statusID !== 5));
        }
    };

    const handleRequestUpdate = async () => {
         getAllRequest();
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleDisConnectionClick = () => {
        setUser({});
        sessionStorage.setItem("accessToken","")
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
            <h1 className="h1Title">Photographer's Requests </h1>
            <h2>({pendingCount} Pending)</h2>
            <div className="filterButtons">
                <button className="managerBtn" onClick={handleShowAllClick}>Show All Requests</button>
                <button className="managerBtn" onClick={handleShowWaitingClick}>Show Waiting Requests</button>
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
