// PhotoOnScreen.js
import React from "react";

function PhotoOnScreen(props) {
    return (
        <div className="photo">
            <img
                key={props.photoKey}
                src={props.src}
                alt={props.alt}
            />
        </div>
    );
}

export default PhotoOnScreen;
