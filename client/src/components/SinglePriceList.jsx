import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import ConfirmationPopUp from './ConfirmationPopUp';
import UpdateCategoryPopUp from './UpdateCategoryPopUp';
import '../CSS/List.css';

function SinglePriceList(props) {
    const category = props.category;
    const user = props.user;
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
            await fetch(`http://localhost:3000/category/${category.categoryID}`, {
                method: 'DELETE',
            });
            setShowConfirmModal(false);
            props.refreshCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleSaveUpdate = async (updatedCategory) => {
        try {
          console.log(updatedCategory.categoryID);
             await fetch(`http://localhost:3000/category/${updatedCategory.categoryID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCategory),
            });
            setShowUpdateModal(false); 
            props.refreshCategories();
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <>
            <div className="box">
                <h2><span className='bold'> {category.categoryName}</span></h2>
                <h3><span className='bold'>Pay Per Hour: </span>{category.payPerHour}</h3>
                <h3><span className='bold'>Number Of Edit Img: </span>{category.numOfEditPictures}</h3>
                {(user.userID == category.photographerID) && (
                    <>
                        <button onClick={handleUpdateClick}>Update</button>
                        <button onClick={handleDeleteClick}>Delete</button>
                    </>
                )}
            </div>
            <ConfirmationPopUp
                show={showConfirmModal}
                handleClose={() => setShowConfirmModal(false)}
                handleConfirm={handleConfirmDelete}
            />
            <UpdateCategoryPopUp
                show={showUpdateModal} 
                handleClose={() => setShowUpdateModal(false)} 
                handleSave={handleSaveUpdate} 
                category={category} 
            />
        </>
    );
}

export default SinglePriceList;
