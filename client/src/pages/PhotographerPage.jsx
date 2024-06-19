import { React, useState, useEffect ,useContext} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
//שאלה:
function PhotographerPage() {
  const context = useContext(UserContext);
  const { user, setUser } = context;
  const location = useLocation();
  const navigate = useNavigate();
  const photographer = location.state.photographer;
 //const id=photographer.userID;
  const [aboutMe, setAboutMe] = useState(" ")
  const roleID = 3;
  useEffect(() => {
    getInformation();
  }, []);

  const handleBackClick = () => {

  };
  const handleDisConnectionClick = () => {
    setUser({})
  };
  const handleConnectionClick = () => {
    navigate('/SignUp', { state: { roleID , photographer } });
  };

  const handlePriceListClick = () => {
    navigate(`/PriceList/${photographer.userID}`, { state: { photographer } });
  };
  const getInformation = async () => {
    const data = await fetch(`http://localhost:3000/aboutMe/${photographer.userID}`);
    const aboutMe = await data.json();
    console.log(aboutMe)
    setAboutMe(aboutMe);
  };
  return (
    <div>
      <button className="btnPhotographer" onClick={handleConnectionClick}>connection</button>
      <button className="btnPhotographer" onClick={handleDisConnectionClick}>disconnection</button>
     
      <h4>hello {user.userName}</h4>
      <h1>{photographer.userName}</h1>
      <p>Photographer ID: {photographer.userID}</p>
      <button className="btnPhotographer" onClick={handlePriceListClick}>PriceList</button>
      <button className="btnPhotographer" onClick={handleBackClick}>Booking a photo day</button>
      <div>{JSON.stringify(aboutMe)}</div>
    </div>
  );
}

export default PhotographerPage;