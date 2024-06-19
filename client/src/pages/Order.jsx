import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Order() {
    const [date, setDate] = useState(new Date());
    const location = useLocation();
    const navigate = useNavigate();
    const photographer = location.state?.photographer;

    if (!photographer) {
        return <div>Photographer not found</div>;
    }

    const handleBackClick = () => {
        navigate(-1); // חזרה לעמוד הקודם
    };

    return (
        <div>
            <div className='onTopBtn'>
                <button onClick={handleBackClick}>Back</button>
            </div>
            <h1>{photographer.userName}'s Calendar</h1>
            <Calendar onChange={setDate} value={date} />
            {/* הוספת כפתור חזרה */}
        </div>
    );
}

export default Order;
