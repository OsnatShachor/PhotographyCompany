import React from "react";
import { useNavigate } from 'react-router-dom';
function RequestOnScreen(props) {
  const navigate = useNavigate();
  const request = props.request;



  return (
    <>
      <div className="box">
        <h2>{request}</h2>
      </div>
    </>
  );
}

export default RequestOnScreen;
