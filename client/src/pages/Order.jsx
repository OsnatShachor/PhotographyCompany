import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../CSS/Order.css';
import OrderPopUp from '../components/OrderPopUp';
import { UserContext } from '../App';

function Order() {
    const [date, setDate] = useState(new Date());
    const [showCreateOrder, setShowCreateOrder] = useState(false);
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
        if (user.userID) {
            console.log("Calling getDisabledDates with id:", id);
            getDisabledDates(id);
        }
    }, [], [id]);

    const fetchCategories = async () => {
        const response = await fetch(`http://localhost:3000/category/${id}`);
        const data = await response.json();
        setCategories(data);
    };

    const getDisabledDates = async (photographerId) => {
        console.log("Getting disabled dates for photographer:", photographerId);
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            const response = await fetch(`http://localhost:3000/order/unavailableDates/${photographerId}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log("Received disabled dates:", data);
            setDisabledDates(data.map(d => new Date(d)));
        } catch (error) {
            console.error('Error fetching disabled dates:', error);
        }
    };

    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
            console.log("Checking date:", date);
            console.log("Disabled dates:", disabledDates);

            // תאריכים שעברו
            if (date < new Date().setHours(0, 0, 0, 0)) {
                console.log("Disabled: Past date");
                return true;
            }
            // שבת
            if (date.getDay() === 6) {
                console.log("Disabled: Saturday");
                return true;
            }
            // תאריכים תפוסים
            const isDisabled = disabledDates.some(disabledDate =>
                date.getFullYear() === disabledDate.getFullYear() &&
                date.getMonth() === disabledDate.getMonth() &&
                date.getDate() === disabledDate.getDate() + 1
            );
            if (isDisabled) {
                console.log("Disabled: Unavailable date");
            }
            return isDisabled;
        }
        return false;
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleDisConnectionClick = () => {
        setUser({});
        navigate(`/YO/photographer/${photographer.userID}`);
    };

    const handleConnectionClick = () => {
        navigate('/YO/SignUp', { state: { roleID, photographer } });
    };

    const handlePrivateAreaClick = () => {
        navigate(`/YO/photographer/${id}/PrivateArea`, { state: { photographer } });
    };

    const handleDateClick = (value) => {
        setDate(value);
        setShowCreateOrder(true);
    };

    const handleHomeClick = () => {
        navigate(`/YO/photographer/${photographer.userID}`);
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
            {showCreateOrder && (
                <OrderPopUp
                    photographerID={id}
                    date={date}
                    categories={categories}
                    onClose={() => setShowCreateOrder(false)}
                />
            )}
        </div>
    );
}

export default Order;
