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

    const handleBackClick = () => {
        navigate(-1);
    };
    useEffect(() => {
        handleViewingRequestClick();
    }, []);
    const handleViewingRequestClick = async () => {
        
        const data = await fetch(`http://localhost:3000/order/${ user.userId}/${id}`);
        const myOrders = await data.json();
        console.log(myOrders);
        setOrders(myOrders);
    }
  
    //לא מוצג
    return (
        <div>
            <h1>My Orders</h1>
            <div id=""> {orders.map((order, index) =>
                (<OrderOnScreen key={index} order={order} />))}</div>
            <button onClick={handleBackClick}>Back</button>
        </div>

    );
}

export default PrivateArea;