import { useState, React, useEffect, useContext } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import SinglePriceList from "../components/SinglePriceList";
import { UserContext } from '../App';
import CategoryPopUp from '../components/CategoryPopUp'; // Import the new modal component
import '../CSS/List.css'
function PriceList() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); // Changed from category to categories
  const { user, setUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [initialCategoryData, setInitialCategoryData] = useState({ categoryName: '', payPerHour: '', numOfEditPictures: '' }); // State for initial category data

  const photographer = location.state?.photographer;
  const roleID = 3;

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const data = await fetch(`http://localhost:3000/category/${id}`);
    const categoryData = await data.json();
    setCategories(categoryData);
  };

  const handleDisConnectionClick = () => {
    setUser({});
    navigate(`/photographer/${photographer.userID}`, { state: { photographer } });
  };

  const handleConnectionClick = () => {
    navigate('/SignUp', { state: { roleID, photographer } });
  };

  const handlePrivateAreaClick = () => {
    if (user && user.userID) {
      navigate(`/photographer/${id}/PrivateArea`, { state: { photographer } });
    } else {
      navigate('/SignUp', { state: { roleID, photographer } });
    }
  };

  const handlePriceListClick = () => {
    setInitialCategoryData({ categoryName: '', payPerHour: '', numOfEditPictures: '' }); // Reset initial category data
    setShowModal(true); // Show the modal when button is clicked
  };

  const handleHomeClick = () => {
    if (id == user.userID) {
      navigate(`/photographerManagement/${user.userID}`)
    } else {
      navigate(`/photographer/${photographer.userID}`, { state: { photographer } });
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSaveCategory = async (category) => {
    try {
      const response = await fetch(`http://localhost:3000/category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...category, photographerID: id }),
      });
      if (!response.ok) {
        throw new Error('Failed to add category');
      }
      // Refresh the category list after adding a new category
      getCategories();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div>
      <div className="onTopBtn">
        <button onClick={handleHomeClick}>Home page</button>
        {!(user && user.userID) && (<button onClick={handleConnectionClick}>Connection</button>)}
        {(user && user.userID) && (<button onClick={handleDisConnectionClick}>DisConnection</button>)}
        {(id != user.userID) && (<button onClick={handlePrivateAreaClick}>Private Area</button>)}
        <button onClick={handleBackClick}>Back</button>
      </div>
      <h1>My Price List</h1>
      <div className="boxShow">
        {categories.map((category, index) => (
          <SinglePriceList
            key={index}
            user={user}
            category={category}
            refreshCategories={getCategories}
          />
        ))}
      </div>
      {(id == user.userID) && (<button onClick={handlePriceListClick}>Add Category</button>)}
      <CategoryPopUp
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveCategory}
        initialCategoryData={initialCategoryData} // Pass initial data to modal
      />
    </div>
  );
}

export default PriceList;
