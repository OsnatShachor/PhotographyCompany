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
    const [filteredOrders, setFilteredOrders] = useState([]);
    const photographer = user;

    useEffect(() => {
        if (!user.userID) {
            navigate(`/YO/photographer/${user.userID}`, { state: { photographer } });
        }
        getAllOrders();
    }, []);

    const handleDisConnectionClick = () => {
        navigate(`/YO/photographer/${user.userID}`, { state: { photographer } });
        setUser({});
    };

    const handleConnectionClick = () => {
        navigate('/YO/SignUp', { state: { roleID, photographer } });
    };

    const handleHomeClick = () => {
        navigate(`/YO/photographerManagement/${user.userID}`);
    };

    const handleCloseModal = () => {
        getAllOrders();
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleRequestClick = () => {
        navigate('/YO/Request', { state: { user } });
    };

    const getAllOrders = async () => {
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            const response = await fetch(`http://localhost:3000/photographer/${id}/orders`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                }
            });
            const allFetchOrders = await response.json();
            setAllOrders(allFetchOrders);
            setFilteredOrders(allFetchOrders); // Initialize with all orders
        } catch (error) {
            setAllOrders([]);
            setFilteredOrders([]);
            console.error('Error fetching waiting Orders:', error);
        }
    };

    const filterOrdersByStatus = (statusID) => {
        if (statusID === null) {
            setFilteredOrders(allOrders);
        } else {
            const filtered = allOrders.filter(order => order.statusID === statusID);
            setFilteredOrders(filtered);
        }
    };

    return (
        <div>
            <div className="onTopBtn">
                <button onClick={handleHomeClick}>Home Page</button>
                <button onClick={handleRequestClick}>Sent Request to YO-Photography</button>
                {!(user && user.userID) && (<button onClick={handleConnectionClick}>Connection</button>)}
                {(user && user.userID) && (<button onClick={handleDisConnectionClick}>DisConnection</button>)}
                <button onClick={handleBackClick}>Back</button>
            </div>
            <h1>All My Orders</h1>
            <div className="filterButtons">
                <button className="managerBtn" onClick={() => filterOrdersByStatus(null)}>Show All Orders</button>
                <button className="managerBtn" onClick={() => filterOrdersByStatus(1)}>Sent Orders</button>
                <button className="managerBtn" onClick={() => filterOrdersByStatus(2)}>Sent For Change Orders</button>
                <button className="managerBtn" onClick={() => filterOrdersByStatus(3)}>Updated Orders</button>
                <button className="managerBtn" onClick={() => filterOrdersByStatus(4)}>Confirmed Orders</button>
                <button className="managerBtn" onClick={() => filterOrdersByStatus(7)}>Waiting For Cancele</button>
                <button className="managerBtn" onClick={() => filterOrdersByStatus(5)}>Cancelled Orders</button>
                <button className="managerBtn" onClick={() => filterOrdersByStatus(6)}>Completed Orders</button>
            </div>
            <div className="orderShow">
                {filteredOrders.map(order => (
                    <PhotographerOrderOnScreen
                        key={order.orderID}
                        order={order}
                        handleCloseModal={handleCloseModal}
                        setAllOrders={setAllOrders}
                        allOrders={allOrders}
                        photographer={photographer}
                    />
                ))}
            </div>
        </div>
    );
}

export default HandleOrders;
