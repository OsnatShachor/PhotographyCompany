import React, { useState, useContext } from 'react';
import { useLocation, useNavigate, Link, useParams } from 'react-router-dom';
import { UserContext } from '../App';

const OrderPopUp = ({ photographerID ,date, photographer, categories, onClose }) => {
    const context = useContext(UserContext);
    const { user, setUser } = context;
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
                userID: user.userId,
                photographerID:photographerID,
                confirmed:0,
                statusID:1,
                categoryID:selectedCategory.categoryID,
                photoDate:formattedDate,
                beginningTime:startTime,
                durationTimePhotography:hours,
                location:location,
                payment:totalPrice
            })
        };

        fetch('http://localhost:3000/order', request)
            .then(response => {
                return response.json();
            })
            .then(() => {
                alert(`Your order has been sent ${date.toDateString()} whith ${photographer.userName}. final price: $${totalPrice.toFixed(2)}`);
                navigate(-1);
            })
            .catch(error => {
                alert('Error making POST request:', error);
            });
        onClose();
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Book a photo day on the date{date.toDateString()}</h2>
                <label>Beginning time:</label>
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                <label>Choose category:</label>
                <select value={selectedCategory.categoryID} onChange={handleCategoryChange}>
                    <option value="">Choose category</option>
                    {categories.map(category => (
                        <option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
                    ))}
                </select>
                <label>Hours:</label>
                <input type="number" min="1" value={hours} onChange={handleHoursChange} />
                <label>Location:</label>
                <input type="text"  value={location}  onChange={(e) => setLocation(e.target.value)} />
                <div>final price NIS{totalPrice.toFixed(2)}</div>
                <button onClick={handleConfirmOrder}>O.K.</button>
            </div>
        </div>
    );
};

export default OrderPopUp;
