import React from "react";
import { useNavigate } from 'react-router-dom';

function PhotographerWebsite(props) {
  const navigate = useNavigate();
  const photographer = props.photographer;

  const handleClick = () => {
    // נווט לכתובת החדשה
    navigate(`/photographer/${photographer.photographerID}`, { state: { photographer } });
  }

  return (
    <>
      <button className="photographerInList" onClick={handleClick}>
        {photographer.photographerName}
      </button>
    </>
  );
}

export default PhotographerWebsite;
