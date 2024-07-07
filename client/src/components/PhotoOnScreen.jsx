import React from "react";
import '../CSS/photos.css'

function PhotoOnScreen(props) {
  return (
    <div className="photos">
      <img 
        src={props.src} 
        alt={props.alt} 
        className="photo"
      />
    </div>
  );
}

export default PhotoOnScreen;
