// PhotoOnScreen.js
import React from "react";
import '../CSS/photos.css'
function PhotoOnScreen(props) {
    return (
        <div className="photos">
            <img id="photo"
                src={props.src}
                alt={props.alt}
            />
        </div>
    );
}

export default PhotoOnScreen;
