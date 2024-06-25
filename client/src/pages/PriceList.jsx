import { useState, React, useEffect } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import SinglePriceList from "../components/SinglePriceList";

function PriceList() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState([])
  const photographer = location.state?.photographer;
  const roleID = 3;
  useEffect(() => {
    getCategories();

  }, []);

  const getCategories = async () => {
    const data = await fetch(`http://localhost:3000/category/${id}`);
    const category = await data.json();
    setCategory(category);
  };

  const handleDisConnectionClick = () => {
    setUser({});
  };

  const handleConnectionClick = () => {
    navigate('/SignUp', { state: { roleID, photographer } });
  };

  const handlePrivateAreaClick = () => {
    navigate(`/photographer/${id}/PrivateArea`, { state: { photographer } });
  };

  const handleHomeClick = () => {
    // נווט לכתובת החדשה
    navigate(`/photographer/${photographer.userID}`, { state: { photographer } });
  }

  const handleBackClick = () => {
    navigate(-1);
  };
  
  return (
    <div>
      <div className="onTopBtn">
        <button onClick={handleHomeClick}>Home page</button>
        <button onClick={handleConnectionClick}>Connection</button>
        <button onClick={handleDisConnectionClick}>Disconnection</button>
        <button onClick={handlePrivateAreaClick}>Private Area</button>
        <button onClick={handleBackClick}>Back</button>

      </div>
      <h1>My Price List</h1>
      <div className="boxShow"> {category.map((category, index) => (<SinglePriceList key={index} category={category} />))}</div>
    </div>
  );
}

export default PriceList;