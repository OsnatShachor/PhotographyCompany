import { React, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

function PhotographerButton(props) {
  const context = useContext(UserContext);
  const { user, setUser } = context;
  const navigate = useNavigate();
  const photographer = props.photographer;

  const handlePhotographerClick = () => {
    setUser({})
    navigate(`/YO/photographer/${photographer.userID}`, { state: { photographer } });
  }

  return (
    <>
      <button className="photographerInList" onClick={handlePhotographerClick}>
        {photographer.userName}
      </button>
    </>
  );
}

export default PhotographerButton;
