import {useState,React,useEffect} from "react";
import { useParams, useLocation, useNavigate} from 'react-router-dom';

function PriceList() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const photographer = location.state.photographer;
    const [category,setCategory]=useState([])
    useEffect(() => {
        getCategories();

      }, []);

  const getCategories = async () => {
    const data = await fetch(`http://localhost:3000/category/${id}`);
    const category = await data.json();
    setCategory(category);
  };
 

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>My Price List</h1>
    <div> {category.map((category, index)=>{<h2>{category.categoryName}</h2>})}</div>
    {/* {photographersArray.map((photographer, index) => (
          <PhotographerWebsite key={index} photographer={photographer} />
        ))} */}
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
}

export default PriceList;