import React from 'react';
import './Styles.scss';

const KitchenCard = ( { kitchen, updatedKitchens, setIsKitchenEditOpen, setKitchenData } )=> {
    
    const handleDeleteClick = evt => {
        fetch(`http://localhost:3000/kitchens/${kitchen.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        updatedKitchens(kitchen)
    }

    const handleEditClick = (evt) => {
        setIsKitchenEditOpen(true)
        setKitchenData(kitchen)

    }
    return(
    <div className="kitchen-list-card">
        <div className="kitchen-list-card-body">
            <p>Kitchen Name: {kitchen.name}</p>
            <p>Kitchen ID: {kitchen.id}</p>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={handleDeleteClick}>Delete</button>
        </div>
    </div>
    )
}

export default KitchenCard;