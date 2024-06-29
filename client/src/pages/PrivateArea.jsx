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
    }, [id]);

    const handleDisConnectionClick = () => {
        setUser({});
        navigate(`/photographer/${photographer.userID}`, { state: { photographer } });
    };

    const handleConnectionClick = () => {
        navigate('/SignUp', { state: { roleID, photographer } });
    };

    const handleHomeClick = () => {
        navigate(`/photographer/${photographer.userID}`, { state: { photographer } });
    };

    const handleViewingMyOrders = async () => {
        const data = await fetch(`http://localhost:3000/order/${user.userID}/${id}`);
        const myOrders = await data.json();
        setOrders(myOrders);
    };

    const handleUpdateOrder = (updatedOrder) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) => (order.orderID === updatedOrder.orderID ? updatedOrder : order));
        );
    };

    return (
        <div>
            <div className="onTopBtn">
                <button onClick={handleHomeClick}>Home page</button>
                <button onClick={handleConnectionClick}>Connection</button>
                <button onClick={handleDisConnectionClick}>Disconnection</button>
                <button onClick={handleBackClick}>Back</button>
            </div>
            <h1>My Orders</h1>
            <div className="orderShow">
                {orders.map(order => (
                    <ClientOrderOnScreen  key={order.orderID} order={order} onUpdate={handleUpdateOrder} />
                ))}
            </div>
        </div>
    );
}

export default PrivateArea;
