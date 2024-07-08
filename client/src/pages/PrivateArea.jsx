import { useState, useEffect, useContext } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from "../App.jsx"
import ClientOrderOnScreen from "../components/ClientOrderOnScreen.jsx";
import '../CSS/PrivateArea.css'

function PrivateArea() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const photographer = location.state?.photographer;
    const roleID = 3;

    const handleBackClick = () => {
        navigate(-1);
    };

    useEffect(() => {
        handleViewingMyOrders();
    }, [user]);

    const handleDisConnectionClick = () => {
        setUser({});
        navigate(`/YO/photographer/${photographer.userID}`, { state: { photographer } });
    };

    const handleConnectionClick = () => {
        navigate('/YO/SignUp', { state: { roleID, photographer } });
    };

    const handleHomeClick = () => {
        navigate(`/YO/photographer/${photographer.userID}`, { state: { photographer } });
    };

    const handleViewingMyOrders = async () => {
        const accessToken=sessionStorage.getItem("accessToken")
        const data = await fetch(`http://localhost:3000/order/${user.userID}/${photographer.userID}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' +accessToken,
                'Content-Type': 'application/json'
            }
        });
        const myOrders = await data.json();
        setOrders(myOrders);
    };

    const handleUpdateOrder = (updatedOrder) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) => (order.orderID === updatedOrder.orderID ? updatedOrder : order))
        );
    };

    return (
        <div>
            <div className="onTopBtn">
                <button onClick={handleHomeClick}>Home page</button>
                {!(user && user.userID) && (<button onClick={handleConnectionClick}>Connection</button>)}
                {(user && user.userID) &&(<button onClick={handleDisConnectionClick}>Disconnection</button>)}
                <button onClick={handleBackClick}>Back</button>
            </div>
            <h1 className="h1Title">My Orders</h1>
            <div className="orderShow">
                {orders.map(order => (
                    <ClientOrderOnScreen key={order.orderID} order={order} onUpdate={handleUpdateOrder} />
                ))}
            </div>
        </div>
    );
}

export default PrivateArea;
