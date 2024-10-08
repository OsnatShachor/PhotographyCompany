import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import UpdateOrderPopUp from '../components/UpdateOrderPopUp';
import '../CSS/PrivateArea.css'
function ClientOrderOnScreen(props) {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [enableUpdate, setEnableUpdate] = useState(false);
    const [enableCancele, setEnableCancele] = useState(false);
    const [orderCategory, setOrderCategory] = useState({});
    const { id } = useParams();
    const order = props.order;

    useEffect(() => {
        getOrderCategory();
        //4- אושר
        //5- בוטל
        //6- סוים
        //7- לקוח לחץ על ביטול
        if (order.statusID !== 4 && order.statusID !== 5 && order.statusID !== 6 && order.statusID !== 7) {
            setEnableUpdate(true);
            setEnableCancele(true);
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
        setShowUpdateModal(true);//פתיחת החלונית של עדכון הזמנה
    };
    const handleCanceleOrderClick = async (e) => {
        e.preventDefault();
        const updatedOrder = {
            ...order,
            statusID: 7,
        };
        const accessToken = sessionStorage.getItem("accessToken");
        const request = {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedOrder)
        };

        try {
            const response = await fetch(`http://localhost:3000/order/${order.orderID}`, request);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error);
            }
            alert("The deletion of the order has been sent to the administrator for approval - you can see in the private email when it will be approved")
            setEnableCancele(false)
        } catch (error) {
            alert(error.message);
        }
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
                {(order.statusID == 1 || order.statusID == 3) && (
                    <h3>STATUS: <span className="bold">Waiting for photographer's approval</span></h3>
                )}
                {(order.statusID == 2) && (
                    <h3>STATUS: <span className="bold">Update according to the photographer's requirements sent to you by email</span></h3>
                )}
                {(order.statusID == 5) && (
                    <h3>STATUS: <span className="bold">Confirm order</span></h3>
                )}
                {(order.statusID == 6) && (
                    <h3>STATUS: <span className="bold">Complete order</span></h3>
                )}
                <h3 className='bold'>Photo Date: </h3>
                <h3>{new Date(order.photoDate).toLocaleDateString()}</h3>
                <h3><span className='bold'>Category: </span>{orderCategory.categoryName}</h3>
                <h3><span className='bold'>Beginning Time: </span>{order.beginningTime}</h3>
                <h3><span className='bold'>Duration Time: </span>{order.durationTimePhotography}</h3>
                <h3><span className='bold'>Location: </span>{order.location}</h3>
                <h3><span className='bold'>Payment: </span>{order.payment}</h3>

                <div className="changeStateBtn">
                    {enableUpdate && <button className="btnInOrder" onClick={handleUpdateClick}>Update</button>}
                    {enableCancele && <button className="btnInOrder" onClick={handleCanceleOrderClick}>Cancele</button>}
                </div>

            </div>

            {showUpdateModal && (
                <UpdateOrderPopUp
                    order={order}
                    onClose={handleCloseModal}//פונקציית של סגירת החלונית ושל ריענון 
                />
            )}
        </>
    );
}

export default ClientOrderOnScreen;
