import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PhotographerWebsite from "../components/PhotographerWebsite";
import '../CSS/WelcomePage.css';
import { UserContext } from '../App';

function ManagerPage() {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const [waitingRequests,setwaitingRequest]=useState([])
    const { user, setUser } = context;
    useEffect(() => {
        getAllWaitingRequest();
      }, []); 
 
      const getAllWaitingRequest = async () => {
        try {
            const response = await fetch(`http://localhost:3000/requests`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const waitingRequests = await response.json();
            setwaitingRequest(waitingRequests);
        } catch (error) {
            console.error('Error fetching waiting requests:', error);
        }
    };
    


    return (
        <div id="waitingRequests">
        {waitingRequests.map((waitingRequest, index) => (
          <PhotographerWebsite key={index} waitingRequest={waitingRequest} />
        ))}
      </div>
    );
}

export default ManagerPage;
