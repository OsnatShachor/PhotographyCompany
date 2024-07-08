import { React, useEffect, useState } from "react";
import ConfirmManegerWindow from "./ConfirmManegerWindow";
import RefuseManagerWindow from "./RefuseManagerWindow";
import emailjs from 'emailjs-com';
import '../CSS/Request.css'
function RequestOnScreen(props) {
  const [photographer, setPhotographer] = useState(null);
  const [showOkModal, setShowOkModal] = useState(false);
  const [showRefuseModal, setShowRefuseModal] = useState(false);
  const [request, setRequest] = useState(props.request);//מכיל את תוכן הבקשה

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
    setShowOkModal(true);// פתיחצ הקומפוננטה של אישור הבקשה 
  };
  const handleRefuseClick = () => {
    setShowRefuseModal(true);
  };

  const handleSendOkEmail = async () => {// כשהמנהל מאשר את הבקשה של הצלם
    const emailDetails = {
      from_name: `${photographer.userName}`,
      To_Email: photographer.email,
      fromName: 'YO-Photography',
      subject: 'Your request has been approved',
      message: `Your request has been approved.
      \nYour website link: http://localhost:5173/photographer/${photographer.userID}`
    };

    emailjs.send(
      'service_u2ebeds',  
      'template_1r1fvrt', 
      emailDetails,
      'sVdp577QDfBGZC2gO'
    )
      .then(async (response) => {
        console.log('Email sent successfully!', response.status, response.text);
        setShowOkModal(false);//סגירת חלונית האישור

        updateRequestStatus(request.requestID, 4, request.photographerID);//מעדכן בנתונים את סטטוס הבקשה
        setRequest({ ...request, statusID: 4 });// מעדכן בבקשה הנוכחית - ביוזסטייט
        props.onRequestUpdate();// ריענון העמוד

      }, (error) => {
        console.error('Failed to send email:', error);
      });
  };

  const handleSendRefuseEmail = async () => {
    const emailDetails = {
      from_name: `${photographer.userName}`,
      To_Email: photographer.email,
      fromName: 'YO-Photography',
      subject: 'Your request has been refused',
      message: `Your request has been refused.
      We are sorry for rejecting your request.\nUnfortunately, your data did not match our requirements`
    };

    emailjs.send(
      'service_u2ebeds',  
      'template_1r1fvrt', 
      emailDetails,
      'sVdp577QDfBGZC2gO' 
    )
      .then(async (response) => {
        console.log('Email sent successfully!', response.status, response.text);
        setShowRefuseModal(false);

        updateRequestStatus(request.requestID, 5, request.photographerID);
        setRequest({ ...request, statusID: 5 });
        props.onRequestUpdate();

      }, (error) => {
        console.error('Failed to send email:', error);
      });
  };
  

  const updateRequestStatus = async (requestID, statusID, photographerID) => {
    try {
        const accessToken = sessionStorage.getItem("accessToken");
        const response = await fetch(`http://localhost:3000/manager/manager/${requestID}`, {
            method: 'PUT',
            headers: { 
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ statusID, photographerID, requestID })
        });

        if (!response.ok) {
            throw new Error('Failed to update request status');
        }
    } catch (error) {
        console.error('Error updating request status:', error);
        alert('Error updating request status:', error);
    }
};


  return (
    <>
      <div className="boxRequest">
        {photographer && (
          <>
            <h4>Photographer Name: {photographer.userName}</h4>
            <h4>Email: {photographer.email}</h4>
            <h3 id="requesth3">{request.request}</h3>
            <div className="changeStateBtn">
              {request.statusID != 4 && (request.statusID != 5) &&
                (<button className="requestBtn" onClick={handleConfirmClick}>Confirm</button>)}
              {(request.statusID != 4) && (request.statusID != 5) &&
                (<button className="requestBtn" onClick={handleRefuseClick}>Refuse</button>)}
            </div>
          </>
        )}
      </div>
      {showOkModal && (
        <ConfirmManegerWindow
          onClose={() => setShowOkModal(false)}
          onConfirm={handleSendOkEmail}
        />
      )}
      {showRefuseModal &&
        (<RefuseManagerWindow
          onClose={() => setShowRefuseModal(false)}
          onRefuse={handleSendRefuseEmail}
        />)}
    </>
  );
}

export default RequestOnScreen;
