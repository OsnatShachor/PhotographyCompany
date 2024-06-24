import { useState, React, useEffect } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from "../App.jsx"
import OrderOnScreen from "../components/OrderOnScreen.jsx";
import { UserContext } from '../App';

function PrivateArea() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const { user, setUser } = context;
    const handleBackClick = () => {
        navigate(-1);
    };
    useEffect(() => {
        handleViewingRequestClick();
    }, []);
    const handleViewingRequestClick = async () => {
        const data = await fetch(`http://localhost:3000/order`,JSON.stringify({userId:user.userId,photographerId:id}));
        const myOrders = await data.json();
        setOrders(myOrders);
    }
    if (!photographer) {
        return <div>Photographer not found</div>;
    }
    //לא מוצג
    return (
        <div>
            <h1>My Orders</h1>
            <div id=""> {oredr.map((order, index) => 
            (<OrderOnScreen key={index} order={order} />))}</div>
            <button onClick={handleBackClick}>Back</button>
        </div>
        
    );
}

export default PrivateArea;