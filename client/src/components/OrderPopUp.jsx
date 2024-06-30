import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import '../CSS/Order.css'

const OrderPopUp = ({ photographerID, date, photographer, categories, onClose }) => {
    const context = useContext(UserContext);
    const { user } = context;
    const navigate = useNavigate();
    const [startTime, setStartTime] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [hours, setHours] = useState(1); // ברירת מחדל של שעה אחת
    const [totalPrice, setTotalPrice] = useState(0);
    const [location, setLocation] = useState('');

    const handleCategoryChange = (event) => {
        const categoryId = parseInt(event.target.value);
        const selectedCategory = categories.find(cat => cat.categoryID === categoryId);
        setSelectedCategory(selectedCategory);
        setTotalPrice(hours * selectedCategory.payPerHour);
    };

    const handleHoursChange = (event) => {
        const hours = parseInt(event.target.value);
        setHours(hours);
        if (selectedCategory) {
            setTotalPrice(hours * selectedCategory.payPerHour);
        }
    };

    const handleConfirmOrder = (e) => {
        e.preventDefault();
        const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
        const request = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID: user.userID,
                photographerID: photographerID,
                confirmed: 0,
                statusID: 1,
                categoryID: selectedCategory.categoryID,
                photoDate: formattedDate,
                beginningTime: startTime,
                durationTimePhotography: hours,
                location: location,
                payment: totalPrice
            })
        };

        fetch('http://localhost:3000/order', request)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => {
                        throw new Error(error.error);
                    });
                }
                return response.json();
            })
            .then(() => {
                alert(`Your order has been sent ${date.toDateString()} with ${photographer.userName}. Final price: $${totalPrice.toFixed(2)}`);
                navigate(-1);
            })
            .catch(error => {
                alert(error.message);
            });
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Book a photo day on</h2>
                <h2><span className='colorfull'>{date.toDateString()}</span></h2>
                <h3 className='orderh3'>Beginning time:
                    <span> <input id="hour" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} /></span>
                </h3>
                <h3 className='orderh3'>Choose category:</h3>
                <select className="input" value={selectedCategory.categoryID} onChange={handleCategoryChange}>
                    <option value="">Choose category</option>
                    {categories.map(category => (
                        <option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
                    ))}
                </select>
                <h3 className='orderh3'>Hours:</h3>
                <input className="input" type="number" min="1" value={hours} onChange={handleHoursChange} />
                <h3 className='orderh3'>Location:</h3>
                <input className="input" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                <h3 className='orderh3'>Final price <span className='colorfull'>{totalPrice.toFixed(2)} NIS</span></h3>
                <button id="button-save" onClick={handleConfirmOrder}>O.K.</button>
            </div>
        </div>
    );
};

export default OrderPopUp;
