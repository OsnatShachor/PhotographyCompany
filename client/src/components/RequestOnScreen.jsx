import { React, useEffect, useState } from "react";
import ConfirmManegerWindow from "./ConfirmManegerWindow";
import emailjs from 'emailjs-com';

function RequestOnScreen(props) {
  const [photographer, setPhotographer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [request, setRequest] = useState(props.request);

  useEffect(() => {
    getPhotographer();
  }, [request]);

  const getPhotographer = async () => {
    try {
      const data = await fetch(`http://localhost:3000/users/${request.photographerID}`);
      const photographerData = await data.json();
      setPhotographer(photographerData[0]);
    } catch (error) {
      console.error("Error fetching photographer:", error);
    }
  };

  const handleConfirmClick = () => {
    setShowModal(true);
  };

  const handleSendEmail = async () => {
    const emailDetails = {
      from_name: `${photographer.userName}`,
      To_Email: photographer.email,
      fromName: 'YO-Photography',
      subject: 'Your request has been approved',
      message: `Your request has been approved.
      \nYour website link: http://localhost:5173/photographer/${photographer.userID}`
    };

    emailjs.send(
      'service_u2ebeds',  // Your service ID
      'template_1r1fvrt', // Your template ID
      emailDetails,
      'sVdp577QDfBGZC2gO' // Your user ID
    )
      .then(async (response) => {
        console.log('Email sent successfully!', response.status, response.text);
        setShowModal(false);
        // Update the request status in the server
        await updateRequestStatus(request.requestID, 4);
        // setRequest({ ...request, statusID: 4 });
        props.onRequestUpdate();
      }, (error) => {
        console.error('Failed to send email:', error);
      });
  };

  const updateRequestStatus = async (requestId, statusID) => {
    try {
      const response = await fetch(`http://localhost:3000/requests/requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId, statusID }),
      });
      if (!response.ok) {
        throw new Error('Failed to update request status');
      }
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  return (
    <>
      <div className="box">
        {photographer && (
          <>
            <h5>Photographer Name: {photographer.userName}</h5>
            <h5>Photographer Email: {photographer.email}</h5>
            <h3>{request.request}</h3>
            {request.statusID === 1 && (
              <button onClick={handleConfirmClick}>Confirm</button>
            )}
          </>
        )}
      </div>
      {showModal && (
        <ConfirmManegerWindow
          onClose={() => setShowModal(false)}
          onConfirm={handleSendEmail}
        />
      )}
    </>
  );
}

export default RequestOnScreen;
