import React, { useState } from 'react';
import EditIngredientModal from '../EditIngredientModal/EditIngredientModal';
import './Styles.scss';

const IngredientCard = ({ ingredient, kitchen_id, updatedIngredients, editedIngredients }) => {

    const [ingredientData, setIngredientData] = useState({
        id: ingredient.id,
        kitchen_id: kitchen_id,
        name: ingredient.name,
        storage: ingredient.storage,
        icon: ingredient.icon,
        status: ingredient.status,
        notes: ingredient.notes
    })

    const [isEditIngredientModalOpen, setIsEditIngredientModalOpen] = useState(false)

    const setRunningLowState = () => {
        let newObj = {
            id: ingredient.id,
            kitchen_id: kitchen_id,
            name: ingredient.name,
            storage: ingredient.storage,
            icon: ingredient.icon,
            status: "Low",
            notes: ingredient.notes
        }
        setIngredientData(newObj)
    }

    const handleEditButton = e => {
        e.preventDefault()
        setIsEditIngredientModalOpen(true)
    }

    const handleRunningLow = e => {
        e.preventDefault()
        let itemToBackend = {
            status: "Low"
        }
        fetch(`http://localhost:3000/ingredients/${ingredientData.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(itemToBackend)
        })
        .then(r => r.json())
        .then((editedIngredient) => {
            editedIngredients(editedIngredient)
            setRunningLowState()
        })
    }
    
    const handleDelete = e => {
        e.preventDefault()
        fetch(`http://localhost:3000/ingredients/${ingredientData.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            }
        })
        updatedIngredients(ingredientData)
    }

    return(
        <>
        <div className='ingredient-card'>
                 <img className='ingredient-card-img-top' src={ingredientData.icon} alt="example"/>
            <div className='ingredient-card-body'>
                <h5>{ingredientData.name}</h5>
                <p>Status: {ingredientData.status}</p>
                <p>Stored in the {ingredientData.storage}</p>
                <button className="edit-button" onClick={handleEditButton}>Edit</button>
                <button className="low-button" onClick={handleRunningLow}>Running Low</button>
                <button className="remove-button" onClick={handleDelete}>Remove</button>
            </div>
        </div>
        <EditIngredientModal 
        open={isEditIngredientModalOpen}
        onClose={() => setIsEditIngredientModalOpen(false)}
        ingredientData={ingredientData}
        setIngredientData={setIngredientData}
        editedIngredients={editedIngredients}
        />
        </>
    )
}

export default IngredientCard;