import React, { useState } from 'react';
import './Styles.scss';

const IngredientCard = ({ ingredient, kitchen_id }) => {

    const [ingredientData, setIngredientData] = useState({
        id: ingredient.id,
        kitchen_id: kitchen_id,
        name: ingredient.name,
        storage: ingredient.storage,
        icon: ingredient.icon,
        status: ingredient.status,
        notes: ingredient.notes
    })

    return(
        <div className='ingredient-card'>
                 <img className='ingredient-card-img-top' src={ingredientData.icon} alt="example"/>
                <div className='ingredient-card-body'>
                    <h5>{ingredientData.name}</h5>
                    <p>Status: {ingredientData.status}</p>
                    <p>Stored in the {ingredientData.storage}</p>
                    <button>Edit</button>
                    <button>Running Low</button>
                    <button>Remove</button>
                </div>
            </div>
    )
}

export default IngredientCard;