import { useState, React, useEffect, useContext } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import PhotographerOrderOnScreen from "../components/PhotographerOrderOnScreen";

function HandleOrders() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [allOrders, setAllOrders] = useState([]);
    const photographer = location.state?.photographer;

    useEffect(() => {
        getAllOrders();
    }, []);
    const handleDisConnectionClick = () => {
        setUser({});
        navigate(`/YO/photographer/${photographer.userID}`, { state: { photographer } });
    };

    const handleConnectionClick = () => {
        navigate('/YO/SignUp', { state: { roleID, photographer } });
    };

    const handleHomeClick = () => {
        navigate(`/YO/photographerManagement/${user.userID}`)

    };
    const handleCloseModal = () => {
        getAllOrders();
    }
    const handleBackClick = () => {
        navigate(-1);
    };

    const getAllOrders = async () => {
        try {
            const accessToken = sessionStorage.getItem("accessToken")
            const response = await fetch(`http://localhost:3000/photographer/${id}/orders`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken,
                        'Content-Type': 'application/json'
                    }
                });
            const allFetchOrders = await response.json();
            console.log(allFetchOrders);
            setAllOrders(allFetchOrders);
        } catch (error) {
            setAllOrders([]);
            console.error('Error fetching waiting requests:', error);
        }
    };

    return (
        <div>
            <div className="onTopBtn">
                <button onClick={handleHomeClick}>Home Page</button>
                {!(user && user.userID) && (<button onClick={handleConnectionClick}>Connection</button>)}
                {(user && user.userID) && (<button onClick={handleDisConnectionClick}>DisConnection</button>)}
                <button onClick={handleBackClick}>Back</button>
            </div>
            <div className="orderShow">
                {allOrders.map(order => (
                    <PhotographerOrderOnScreen key={order.orderID} order={order} handleCloseModal={handleCloseModal} />
                ))}
            </div>
        </div>
    );
}

export default HandleOrders;
