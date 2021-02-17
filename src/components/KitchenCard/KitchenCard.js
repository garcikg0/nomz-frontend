import React from 'react';
import './Styles.scss';

const KitchenCard = ( kitchen )=> {
    
    const handleClick = evt => {
        
    }
    return(
    <div className="kitchen-list-card">
        <div className="kitchen-list-card-body">
            <p>Kitchen Name: {kitchen.name}</p>
            <p>Kitchen ID: {kitchen.id}</p>
            <button onClick={handleClick}>Delete</button>
        </div>
    </div>
    )
}

export default KitchenCard;