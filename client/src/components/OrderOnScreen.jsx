import React from "react";
import { useNavigate } from 'react-router-dom';

function OrderOnScreen(props) {
    const navigate = useNavigate();
    const order = props.category;



    return (
        <>
            <div className="ordersOnScreen">
                <h2>{order.photoDate}</h2>
                <h2>{order.beginningTime}</h2>
                <h2>{order.durationTimePhotography}</h2>
                <h2>{order.location}</h2>
                <h2>{order.payment}</h2>
            </div>
        </>
    );
}

export default OrderOnScreen;
