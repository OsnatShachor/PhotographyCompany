import React from "react";
import { useNavigate } from 'react-router-dom';

function PhotographerWebsite(props) {
  const navigate = useNavigate();
  const photographer = props.photographer;

  const handlePhotographerClick = () => {
    // נווט לכתובת החדשה
    navigate(`/photographer/${photographer.userID}`, { state: { photographer } });
  }

  return (
    <>
      <button className="photographerInList" onClick={handlePhotographerClick}>
        {photographer.userName}
      </button>
    </>
  );
}

export default PhotographerWebsite;
