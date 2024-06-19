import {useState,React,useEffect} from "react";
import { useParams, useLocation, useNavigate} from 'react-router-dom';
import SinglePriceList from "../components/SinglePriceList";

function PriceList() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
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
    navigate(`/photographer/${id}`, { state: { photographer }});
  };
//לא מוצג
  return (
    <div>
      <h1>My Price List</h1>
    <div> {category.map((category, index)=>(<SinglePriceList key={index} category={category}/>))}</div>
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
}

export default PriceList;