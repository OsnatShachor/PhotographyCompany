import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateOrderPopUp = (props) => {
    const order = props.order;
    const { id } = useParams();
    const [startTime, setStartTime] = useState(order.beginningTime);
    const [selectedCategory, setSelectedCategory] = useState(order.categoryID);
    const [hours, setHours] = useState(order.durationTimePhotography);
    const [totalPrice, setTotalPrice] = useState(order.payment);
    const [location, setLocation] = useState(order.location);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories();
    }, [selectedCategory, hours]); // Removed 'categories' from dependency array

    useEffect(() => {
        getAllCategories();
    }, [id]); // Removed 'categories' from dependency array

    const getAllCategories = async () => {
        try {
            const data = await fetch(`http://localhost:3000/category/${id}`);
            const categories = await data.json(); // Changed 'category' to 'categories'
            setCategories(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCategoryChange = (event) => {
        const categoryId = parseInt(event.target.value);
        setSelectedCategory(categoryId);
        const selectedCat = categories.find(cat => cat.categoryID === categoryId);
        if (selectedCat) {
            setTotalPrice(hours * selectedCat.payPerHour);
        }
    };

    const handleHoursChange = (event) => {
        const hours = parseInt(event.target.value);
        setHours(hours);
        const selectedCat = categories.find(cat => cat.categoryID === selectedCategory);
        if (selectedCat) {
            setTotalPrice(hours * selectedCat.payPerHour);
        }
    };

    const handleUpdateOrder = async (e) => {
        e.preventDefault();
        const updatedOrder = {
            ...order,
            statusID: 3,
            beginningTime: startTime,
            categoryID: selectedCategory,
            durationTimePhotography: hours,
            location: location,
            payment: totalPrice,
        };

        const request = {
            method: "PUT",
            headers: {
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
            alert("Order updated successfully!");
            props.onClose(updatedOrder); // Pass updated order back to parent component
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => props.onClose(null)}>&times;</span>
                <h2>Update Order</h2>
                <h3 className='orderh3'>Beginning time:
                    <span> <input id="hour" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} /></span>
                </h3>
                <h3 className='orderh3'>Choose category:</h3>
                <select className="input" value={selectedCategory} onChange={handleCategoryChange}>
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
                <button id="button-save" onClick={handleUpdateOrder}>Update</button>
            </div>
        </div>
    );
};

export default UpdateOrderPopUp;
