import React from "react";


function PhotographerPage() {
    const [showModal, setShowModal] = useState(false);
    const handleAboutClick = async () => {
        setShowModal(true)
    };

    const handleSitePolicyClick = async () => {

    };
    const handlePriceListClick = async () => {

    };
    const handleOrderClick = async () => {

    };
    const handleAddingPhotosClick = async () => {

    };

    return (
        <>
            <button onClick={handleAboutClick}>about yourself</button>
            <button onClick={handleSitePolicyClick}>Your site policy</button>
            <button onClick={handlePriceListClick}>Price List</button>
            <button onClick={handleOrderClick}>Order management</button>
            <button onClick={handleAddingPhotosClick}>Adding photos to the gallery</button>
            {(request.statusID == 1) && (
                <button onClick={handleAboutClick}>About</button>
            )}
           {showModal&&
            <AboutModal
                showModal={showModal}
                setShowModal={setShowModal}
              photographerID={photographer.userID}
            />}
        </>
    );
}

export default PhotographerPage;
