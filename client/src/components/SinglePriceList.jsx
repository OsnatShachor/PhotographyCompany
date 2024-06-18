import React from "react";
import { useNavigate } from 'react-router-dom';

function SinglePriceList(props) {
  const navigate = useNavigate();
  const category = props.category;



  return (
    <>
      <div className="priceListOnScreen">
        <h2>{category.categoryName}</h2>
        <h2>{category.payPerHour}</h2>
        <h2>{category.numOfEditPictures}</h2>
      </div>
    </>
  );
}

export default SinglePriceList;
