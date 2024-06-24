import React from "react";
import { useNavigate } from 'react-router-dom';

function RequestOnScreen(props) {
  const navigate = useNavigate();
  const waitingRequest = props.waitingRequest;



  return (
    <>
      <div className="priceListOnScreen">
        <h2>{waitingRequest.request}</h2>
      </div>
    </>
  );
}

export default RequestOnScreen;
