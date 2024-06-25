import React from "react";
import { useNavigate } from 'react-router-dom';
import '../CSS/List.css'
function SinglePriceList(props) {
  const navigate = useNavigate();
  const category = props.category;



  return (
    <>
      <div className="box">
        <h2><span className='bold'> {category.categoryName}</span></h2>
        <h3><span className='bold'>Pay Per Hour: </span>{category.payPerHour}</h3>
        <h3><span className='bold'>Number Of Edit Img: </span>{category.numOfEditPictures}</h3>
      </div>
    </>
  );
}

export default SinglePriceList;
