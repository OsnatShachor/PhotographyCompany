import React, { useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import ConfirmationPopUp from './ConfirmationPopUp';
import UpdateCategoryPopUp from './UpdateCategoryPopUp';
import '../CSS/List.css';
import { UserContext } from '../App';

function SingleCategoryOnScreen(props) {
    const context = useContext(UserContext);
    const { user, setUser } = context;
    const category = props.category;
    const { id } = useParams();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const handleUpdateClick = () => {
        setShowUpdateModal(true);
    };

    const handleDeleteClick = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const accessToken = sessionStorage.getItem("accessToken")
            await fetch(`http://localhost:3000/category/${category.categoryID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                }
            });
            setShowConfirmModal(false);
            props.refreshCategories();//פונקציה בעמוד הכללי שמציגה מחדש את הקטגוריות על המסך - ריענון
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleUpdateCategory = async (updatedCategory) => {
        try {
            const accessToken = sessionStorage.getItem("accessToken");
            updatedCategory.categoryID = category.categoryID; 
            await fetch(`http://localhost:3000/category/${category.categoryID}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCategory),
            });
            setShowUpdateModal(false);//סגירת החלונית
            props.refreshCategories();
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <>
            <div className="boxPrice">
                <h2><span className='bold'> {category.categoryName}</span></h2>
                <h3><span className='bold'>Pay Per Hour: </span>{category.payPerHour}</h3>
                <h3><span className='bold'>Number Of Edit Img: </span>{category.numOfEditPictures}</h3>
                {(user.userID == category.photographerID) && (
                    <div className="changeStateBtn">
                        <button className="btnInBox" onClick={handleUpdateClick}>Update</button>
                        <button className="btnInBox" onClick={handleDeleteClick}>Delete</button>
                    </div>
                )}
            </div>
           {showConfirmModal&& <ConfirmationPopUp
                handleClose={() => setShowConfirmModal(false)}
                handleConfirm={handleConfirmDelete}
            />}

           {showUpdateModal && <UpdateCategoryPopUp
                handleClose={() => setShowUpdateModal(false)}
                handleSave={handleUpdateCategory}//שליחת הפונקציה של עדכון הקטגוריה לחלונית העדכון 
                category={category}
            />}
        </>
    );
}

export default SingleCategoryOnScreen;
