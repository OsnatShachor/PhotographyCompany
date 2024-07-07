import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../CSS/PhotographerManagement.css';
import SendEmailToUpdate from "./SendEmailToUpdate";
import SendEmailToCancele from "./SendEmailToCancele";
import SendEmailToConfirm from "./SendEmailToConfirm";
import emailjs from 'emailjs-com';

function PhotographerOrderOnScreen(props) {
    const [user, setUser] = useState({});
    const [orderCategory, setOrderCategory] = useState({});
    const [status, setStatus] = useState({});
    const [enableShow, setEnableShow] = useState(false);
    const [enableUpdate, setEnableUpdate] = useState(false);
    const [enableCancele, setEnableCancele] = useState(false);
    const [showSendForConfirm, setShowSendForConfirm] = useState(false);
    const [showSendForUpdate, setShowSendForUpdate] = useState(false);
    const [showSendForCancele, setShowSendForCancele] = useState(false);
    const { id } = useParams();
    const order = props.order;
    const photographer = props.photographer;
    const allOrders = props.allOrders;

    useEffect(() => {
        getUser();
        getStatus();
        if (order.statusID !== 5 && order.statusID !== 6 && order.statusID !== 4 && order.statusID !== 7) {
            setEnableUpdate(true);
        }
        if (order.statusID !== 5 && order.statusID !== 6) {
            setEnableCancele(true);
        }
        getOrderCategory();
    }, [enableShow]);

    const getUser = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/${order.userID}`);
            if (!response.ok) throw new Error('Failed to fetch user data');
            const userData = await response.json();
            setUser(userData[0]);
        } catch (error) {
            console.error("Error fetching user:", error);
            alert("Error fetching user data. Please try again later.");
        }
    };

    const getStatus = async () => {
        try {
            const response = await fetch(`http://localhost:3000/statuses/${order.statusID}`);
            if (!response.ok) throw new Error('Failed to fetch status data');
            const statusData = await response.json();
            setStatus(statusData[0]);
        } catch (error) {
            console.error("Error fetching status:", error);
            alert("Error fetching status data. Please try again later.");
        }
    };

    const getOrderCategory = async () => {
        try {
            const response = await fetch(`http://localhost:3000/category/${id}/${order.categoryID}`);
            if (!response.ok) throw new Error('Failed to fetch category data');
            const categories = await response.json();
            setOrderCategory(categories[0]);
        } catch (error) {
            console.error('Error fetching categories:', error);
            alert("Error fetching category data. Please try again later.");
        }
    };

    const updateStatusOrder = async (statusID, reason) => {
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

            const emailDetails = {
                from_name: `${photographer.userName}`,
                to_email: user.email,
                subject: '',
                message: ''
            };

            switch (statusID) {
                case 2:
                    emailDetails.subject = 'Your Order needs updating';
                    emailDetails.message = `${reason}`;
                    break;
                case 4:
                    emailDetails.subject = 'Your order has been updated by the photographer';
                    emailDetails.message = `Your request has been confirmed. You can see more details in your private area on my website.`;
                    break;
                case 5:
                    emailDetails.subject = 'Your Order has been canceled';
                    emailDetails.message = `${reason}`;
                    break;
            }

            await handleSendEmail(emailDetails);

            const updatedOrder = { ...order, statusID };
            const updatedOrders = allOrders.map(o => o.orderID === order.orderID ? updatedOrder : o);
            props.setAllOrders(updatedOrders);

            props.handleCloseModal();
            onClose();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleSendEmail = async (emailDetails) => {
        try {
            await emailjs.send(
                'service_u2ebeds',
                'template_0x4k60t',
                emailDetails,
                'sVdp577QDfBGZC2gO'
            );
            console.log('Email sent successfully!');
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    };

    const onClose = () => {
        setEnableShow(false);
        props.handleCloseModal();
    };

    const handleShowDetailsClick = () => {
        setEnableShow(true);
    };

    return (
        <>
            <div className="orderPhotographBox">
                <h3 className='h3Order'><span className='bold'>Client: </span></h3>
                <h3 className='h3Order'>{user.userName}</h3>
                <h3 className='h3Order'><span className='bold'>Photo Date:</span> </h3>
                <h3 className='h3Order'>{new Date(order.photoDate).toLocaleDateString()}</h3>
                <h3 className='h3Order'><span className='bold'>Status: </span>{status.statusName} </h3>

                <button className="showDetailBtn" onClick={handleShowDetailsClick}>Show Details</button>

                {enableShow && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setEnableShow(false)}>&times;</span>
                            <h3 className='bold'>Client: </h3>
                            <h3>{user.userName}</h3>
                            <h3 className='bold'>Client Email: </h3>
                            <h3>{user.email}</h3>
                            <h3 className='bold'>Photo Date: </h3>
                            <h3>{new Date(order.photoDate).toLocaleDateString()}</h3>
                            <h3><span className='bold'>Category: </span>{orderCategory.categoryName}</h3>
                            <h3><span className='bold'>Beginning Time: </span>{order.beginningTime}</h3>
                            <h3><span className='bold'>Duration Time: </span>{order.durationTimePhotography}</h3>
                            <h3><span className='bold'>Location: </span>{order.location}</h3>
                            <h3><span className='bold'>Payment: </span>{order.payment}</h3>

                            <div className="changeStateBtn">
                                {enableUpdate && (
                                    <button className="btnInOrder" onClick={() => setShowSendForConfirm(true)}>Confirm</button>
                                )}
                                {enableUpdate && (
                                    <button className="btnInOrder" onClick={() => setShowSendForUpdate(true)}>Send For Update</button>
                                )}
                                {enableCancele && (
                                    <button className="btnInOrder" onClick={() => setShowSendForCancele(true)}>Cancel</button>
                                )}
                            </div>

                            {showSendForConfirm && (
                                <SendEmailToConfirm
                                    onClose={() => setShowSendForConfirm(false)}
                                    onSend={updateStatusOrder}
                                />
                            )}
                            {showSendForUpdate && (
                                <SendEmailToUpdate
                                    onClose={() => setShowSendForUpdate(false)}
                                    onSend={updateStatusOrder}
                                />
                            )}
                            {showSendForCancele && (
                                <SendEmailToCancele
                                    onClose={() => setShowSendForCancele(false)}
                                    onSend={updateStatusOrder}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default PhotographerOrderOnScreen;
