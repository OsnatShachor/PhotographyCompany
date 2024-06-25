import React from "react";
import { useNavigate } from 'react-router-dom';

function OrderOnScreen(props) {
    const navigate = useNavigate();
    const order = props.order;



    return (
        <>
            <div className="box">
                <h3 className='bold'>Photo Date: </h3>
                <h3>{order.photoDate}</h3>
                <h3><span className='bold'>Beginning Time: </span>{order.beginningTime}</h3>
                <h3><span className='bold'>Duration Time: </span>{order.durationTimePhotography}</h3>
                <h3><span className='bold'>Location: </span>{order.location}</h3>
                <h3><span className='bold'>Payment: </span>{order.payment}</h3>
            </div>
        </>
    );
}

export default OrderOnScreen;
