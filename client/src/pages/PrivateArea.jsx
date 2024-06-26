import { useState, React, useEffect, useContext } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from "../App.jsx"
import OrderOnScreen from "../components/OrderOnScreen.jsx";

function PrivateArea() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const { user, setUser } = context;
    const [orders, setOrders] = useState([])
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
    }
    const handleViewingMyOrders = async () => {
        try {
            const data = await fetch(`http://localhost:3000/order/${user.userID}/${id}`);
            const myOrders = await data.json();
            console.log(myOrders);
            setOrders(myOrders);
        }catch (error) {
            alert(error);
          }
    }

    //לא מוצג
    return (
        <div>
            <div className="onTopBtn">
                <button onClick={handleHomeClick}>Home page</button>
                <button onClick={handleConnectionClick}>Connection</button>
                <button onClick={handleDisConnectionClick}>Disconnection</button>
                <button onClick={handleBackClick}>Back</button>
            </div>
            <h1>My Orders</h1>
            <div className="boxShow"> {orders.map((order, index) =>
                (<OrderOnScreen key={index} order={order} />))}
            </div>
        </div>

    );
}

export default PrivateArea;