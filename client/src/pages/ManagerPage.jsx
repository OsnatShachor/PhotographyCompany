import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RequestOnScreen from "../components/RequestOnScreen";
import '../CSS/WelcomePage.css';
import { UserContext } from '../App';

function ManagerPage() {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const [allRequests,setAllRequests]=useState([])
    const { user, setUser } = context;
    useEffect(() => {
      getAllRequest();
      }, []); 
 
      const getAllRequest = async () => {
        try {
            const response = await fetch(`http://localhost:3000/requests`);
            const allRequest = await response.json();
            setAllRequests(allRequest);
        } catch (error) {
            console.error('Error fetching waiting requests:', error);
        }
    };
    


    return (
        <div id="waitingRequests">
        {allRequests.map((request, index) => (
          <RequestOnScreen key={index} request={request} />
        ))}
      </div>
    );
}

export default ManagerPage;
