import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../CSS/PrivateArea.css'

function PhotographerOrderOnScreen(props) {
    const [user, setUser] = useState({});
    const [orderCategory, setOrderCategory] = useState({});
    const [enableShow, setEnableShow] = useState(false);
    const [enableUpdate, setEnableUpdate] = useState(false);
    const [enableCancele, setEnableCancele] = useState(false);

    const { id } = useParams();
    const order = props.order;

    useEffect(() => {
        getUser();
        if (order.statusID !== 5 && order.statusID !== 6 && order.statusID !== 4) {
            setEnableUpdate(true);
        }
        if (order.statusID !== 6) {
            setEnableCancele(true);
        }
        getOrderCategory();
    }, []);

    const getUser = async () => {
        try {
            const data = await fetch(`http://localhost:3000/users/${order.userID}`);
            const userData = await data.json();
            setUser(userData[0]);
        } catch (error) {
            console.error("Error fetching photographer:", error);
        }
    };

    const handleUpdateClick = async (statusID) => {
        const accessToken = sessionStorage.getItem("accessToken");
        const request = {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ statusID })
        };

        try {
            const response = await fetch(`http://localhost:3000/photographer/${order.orderID}`, request);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error);
            }
            if (statusID == 4) {
                alert("The order has been successfully confirmed");
            } else {
                if (statusID == 2 || statusID == 5) {
                    //open mail window   
                }
            }
            onClose();
        } catch (error) {
            alert(error.message);
        }
    }

    const getOrderCategory = async () => {
        try {
            const data = await fetch(`http://localhost:3000/category/${id}/${order.categoryID}`);
            const categories = await data.json();
            setOrderCategory(categories[0]);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const onClose = async () => {
        setEnableShow(false);
        props.handleCloseModal();
    }
    const handleShowDetailsClick = async () => {
        setEnableShow(true);
    }
    return (
        <>
            <div className="orderPhotoBox">
                <h3 className='bold'>Client: </h3>
                <h3>{user.userName}</h3>
                <br />
                <h3 className='bold'>Photo Date: </h3>
                <h3>{new Date(order.photoDate).toLocaleDateString()}</h3>
                <button onClick={handleShowDetailsClick} >Show Details</button>
                {enableShow && <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={onClose}>&times;</span>
                        <h3 className='bold'>Client: </h3>
                        <h3>{user.userName}</h3>
                        <h3 className='bold'>Client Email </h3>
                        <h3>{user.email}</h3>
                        <h3 className='bold'>Photo Date: </h3>
                        <h3>{new Date(order.photoDate).toLocaleDateString()}</h3>
                        <h3><span className='bold'>Category: </span>{orderCategory.categoryName}</h3>
                        <h3><span className='bold'>Beginning Time: </span>{order.beginningTime}</h3>
                        <h3><span className='bold'>Duration Time: </span>{order.durationTimePhotography}</h3>
                        <h3><span className='bold'>Location: </span>{order.location}</h3>
                        <h3><span className='bold'>Payment: </span>{order.payment}</h3>

                        <div className="changeStateBtn">
                            {enableUpdate && <button className="btnInOrder" onClick={() => handleUpdateClick(4)}>Confirm</button>}
                            {enableUpdate && <button className="btnInOrder" onClick={() => handleUpdateClick(2)}>Sent For Update</button>}
                            {enableCancele && <button className="btnInOrder" onClick={() => handleUpdateClick(5)}>Cancele</button>}

                        </div>
                    </div>
                </div>}
            </div>

        </>
    );
}

export default PhotographerOrderOnScreen;
