import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import OrderPopUp from '../components/OrderPopUp'; // ניתן להתאים את הנתיב כפי הצורך

function Order() {
    const [date, setDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const photographer = location.state?.photographer;

    if (!photographer) {
        return <div>Photographer not found</div>;
    }

    const handleBackClick = () => {
        navigate(-1); // חזרה לעמוד הקודם
    };

    const handleDateClick = (value) => {
        setDate(value);
        setShowModal(true);
    };
    useEffect(() => {
        // Simulate fetching categories from your database or API
        const fetchCategories = async () => {
            // Replace with your actual fetch logic
            const response = await fetch(`http://localhost:3000/category/${id}`);
            const data = await response.json();
            setCategories(data); // Assuming data is an array of category objects
        };

        fetchCategories();
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <div className='onTopBtn'>
                <button onClick={handleBackClick}>Back</button>
            </div>
            <h1>לוח שנה של {photographer.userName}</h1>
            <Calendar onChange={handleDateClick} value={date} />
    
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
