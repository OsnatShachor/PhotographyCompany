import React from "react";


function AboutMeOnScreen(props) {
  const category = props.category;



  return (
    <>
      <div className="aboutMeOnScreen">
        <h2>{category.categoryName}</h2>
        <h2>{category.payPerHour}</h2>
        <h2>{category.numOfEditPictures}</h2>
      </div>
    </>
  );
}

export default AboutMeOnScreen;
