import React from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function PhotographerPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const photographer = location.state.photographer;

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>{photographer.userName}</h1>
      <p>Photographer ID: {id}</p>
      {/* תוסיף כאן פרטים נוספים על הצלם */}
      <button onClick={handleBackClick}>חזרה לעמוד הבית</button>
    </div>
  );
}

export default PhotographerPage;

