import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../CSS/Order.css';
import OrderPopUp from '../components/OrderPopUp';
import { UserContext } from '../App';

function Order() {
    const [date, setDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [disabledDates, setDisabledDates] = useState([]);
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const photographer = location.state?.photographer;
    const { user, setUser } = useContext(UserContext);
    const roleID = 3;

    useEffect(() => {
        fetchCategories();
        if (id) {
            getDisabledDates(id);
        }
    }, [id]);

    const fetchCategories = async () => {
        const response = await fetch(`http://localhost:3000/category/${id}`);
        const data = await response.json();
        setCategories(data);
    };

    const getDisabledDates = async (photographerId) => {
        console.log("getDisabledDates client ");
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            const response = await fetch(`http://localhost:3000/order/unavailable-dates/${photographerId}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setDisabledDates(data.map(d => new Date(d)));
        } catch (error) {
            console.error('Error fetching disabled dates:', error);
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleDisConnectionClick = () => {
        setUser({});
        navigate(`/photographer/${photographer.userID}`, { state: { photographer } });
    };

    const handleConnectionClick = () => {
        navigate('/SignUp', { state: { roleID, photographer } });
    };

    const handlePrivateAreaClick = () => {
        navigate(`/photographer/${id}/PrivateArea`, { state: { photographer } });
    };

    const handleDateClick = (value) => {
        setDate(value);
        setShowModal(true);
    };

    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
            if (date < new Date().setHours(0, 0, 0, 0)) {
                return true;
            }
            if (date.getDay() === 6) {
                return true;
            }
            return disabledDates.some(disabledDate =>
                date.getFullYear() === disabledDate.getFullYear() &&
                date.getMonth() === disabledDate.getMonth() &&
                date.getDate() === disabledDate.getDate()
            );
        }
        return false;
    };

    const handleHomeClick = () => {
        navigate(`/photographer/${photographer.userID}`, { state: { photographer } });
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div id="welcomePage">
            <div className="onTopBtn">
                <button onClick={handleHomeClick}>Home Page</button>
                {!(user && user.userID) && (<button onClick={handleConnectionClick}>Connection</button>)}
                {(user && user.userID) && (<button onClick={handleDisConnectionClick}>Disconnection</button>)}
                <button onClick={handlePrivateAreaClick}>Private Area</button>
                <button onClick={handleBackClick}>Back</button>
            </div>
            <h1>Choose a date for the photo shoot</h1>
            <div id="Calendar">
                <Calendar
                    onChange={handleDateClick}
                    value={date}
                    tileDisabled={tileDisabled}
                    locale="en-US"
                />
            </div>
            {showModal && (
                <OrderPopUp
                    photographerID={id}
                    date={date}
                    photographer={photographer}
                    categories={categories}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default Order;
