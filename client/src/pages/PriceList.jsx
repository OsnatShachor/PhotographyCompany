import { useState, React, useEffect, useContext } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import SingleCategoryOnScreen from "../components/SingleCategoryOnScreen";
import { UserContext } from '../App';
import CategoryPopUp from '../components/CategoryPopUp'; 
import '../CSS/List.css'
function PriceList() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); 
  const { user, setUser } = useContext(UserContext);
  const [showCategoryPopUp, setShowCategoryPopUp] = useState(false);
  const [initialCategoryData, setInitialCategoryData] = useState({ categoryName: '', payPerHour: '', numOfEditPictures: '' });//התוכן שיוצג לי בקומפוננטה של עדכון / הוספה

  const photographer = location.state?.photographer;
  const roleID = 3;

  useEffect(() => {
    getCategories();
  }, [categories]);

  const getCategories = async () => {
    const data = await fetch(`http://localhost:3000/category/${id}`);
    const categoryData = await data.json();
    setCategories(categoryData);
  };

  const handleDisConnectionClick = () => {
    setUser({});
    sessionStorage.setItem("accessToken","")
    navigate(`/YO/photographer/${photographer.userID}`, { state: { photographer } });
  };

  const handleConnectionClick = () => {
    navigate('/YO/SignUp', { state: { roleID, photographer } });
  };

  const handlePrivateAreaClick = () => {
    if (user && user.userID) {
      navigate(`/YO/photographer/${id}/PrivateArea`, { state: { photographer } });
    } else {
      navigate('/YO/SignUp', { state: { roleID, photographer } });
    }
  };

  const handlePriceListClick = () => {
    setInitialCategoryData({ categoryName: '', payPerHour: '', numOfEditPictures: '' });//אתחול הערכים שיהיו ריקים בקומפוננטה
    setShowCategoryPopUp(true); 
  };

  const handleHomeClick = () => {
    if (id == user.userID) {
      navigate(`/YO/photographerManagement/${user.userID}`)
    } else {
      navigate(`/YO/photographer/${photographer.userID}`);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleAddCategory = async (category) => {
    try {
      const accessToken = sessionStorage.getItem("accessToken")
      const response = await fetch(`http://localhost:3000/category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken,
        },
        body: JSON.stringify({ ...category, photographerID: id }),
      });
      if (!response.ok) {
        throw new Error('Failed to add category');
      }
      const newCategory = response.json();
      setCategories(prevCategories => [...prevCategories, newCategory]);
      getCategories();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div>
      <div className="onTopBtn">
        <button onClick={handleHomeClick}>Home Page</button>
        {!(user && user.userID) && (<button onClick={handleConnectionClick}>Connection</button>)}
        {(user && user.userID) && (<button onClick={handleDisConnectionClick}>DisConnection</button>)}
        {(id != user.userID) && (<button onClick={handlePrivateAreaClick}>Private Area</button>)}
        <button onClick={handleBackClick}>Back</button>
      </div>
      <h1 className="h1Title">Price List</h1>

      <div id= "addPriceBtn">{(id == user.userID) && (<button className="managerBtn" onClick={handlePriceListClick}>Add Category</button>)}</div>
      <div className="boxShow">
        {categories.map((category, index) => (
          <SingleCategoryOnScreen
            key={index}
            category={category}
            refreshCategories={getCategories}
          />
        ))}
      </div>

     {showCategoryPopUp&& <CategoryPopUp
        handleClose={() => setShowCategoryPopUp(false)}
        handleSave={handleAddCategory}
        initialCategoryData={initialCategoryData} // Pass initial data to modal
      />}
    </div>
  );
}

export default PriceList;
