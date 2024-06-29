import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import UpdateOrderPopUp from '../components/UpdateOrderPopUp';

function ClientOrderOnScreen(props) {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [enableUpdate, setEnableUpdate] = useState(false);
    const [orderCategory, setOrderCategory] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();
    const order = props.order;

    useEffect(() => {
        getOrderCategory();
        if (order.statusID !== 5 && order.statusID !== 6) {
            setEnableUpdate(true);
        }
    }, [order.statusID, id, order.categoryID]);

    const getOrderCategory = async () => {
        try {
            const data = await fetch(`http://localhost:3000/category/${id}/${order.categoryID}`);
            const categories = await data.json();
            setOrderCategory(categories[0]); 
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleUpdateClick = () => {
        setShowUpdateModal(true);
    };

    const handleCloseModal = (updatedOrder) => {
        setShowUpdateModal(false);
        if (updatedOrder) {
            props.onUpdate(updatedOrder); // Update order in parent component
        }
    };

    return (
        <>
            <div className="box">
                <h3 className='bold'>Photo Date: </h3>
                <h3>{new Date(order.photoDate).toLocaleDateString()}</h3>
                <h3><span className='bold'>Category: </span>{orderCategory.categoryName}</h3>
                <h3><span className='bold'>Beginning Time: </span>{order.beginningTime}</h3>
                <h3><span className='bold'>Duration Time: </span>{order.durationTimePhotography}</h3>
                <h3><span className='bold'>Location: </span>{order.location}</h3>
                <h3><span className='bold'>Payment: </span>{order.payment}</h3>
                {enableUpdate && <button className='btnTodo' onClick={handleUpdateClick}>Update</button>}
            </div>

            {showUpdateModal && (
                <UpdateOrderPopUp
                    order={order}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}

export default ClientOrderOnScreen;
