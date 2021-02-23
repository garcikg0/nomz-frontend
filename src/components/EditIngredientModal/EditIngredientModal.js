import React, { useState } from 'react';
import './Styles.scss';
import ReactDom from 'react-dom'


const EditIngredientModal = ( {open, onClose, ingredientData, editedIngredients, setIngredientData} ) => {

    const [editedIngredient, setEditedIngredient] = useState({
        id: ingredientData.id,
        kitchen_id: ingredientData.kitchen_id,
        name: ingredientData.name,
        storage: ingredientData.storage,
        icon: ingredientData.icon,
        status: ingredientData.status,
        notes: ingredientData.notes
    })
    
    if (!open) return null;

    const handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;

        setEditedIngredient({
            ...editedIngredient,
            [name]: value
        })
    };

    const handleEditSubmit = (evt) => {
        evt.preventDefault()
        let itemToBackend = editedIngredient
        fetch(`http://localhost:3000/ingredients/${itemToBackend.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(itemToBackend)
        })
        .then(r => r.json())
        .then((ingredientToUpdate) => {
            editedIngredients(ingredientToUpdate)
            onClose()
            setIngredientData(itemToBackend)
        })
    }

    return ReactDom.createPortal(
        <>
        <div className="edit-ingredient-modal-overlay">
            <div className="edit-ingredient-modal">
                <div className="edit-ingredient-formBox">
                    <form className='edit-ingredient-card' onSubmit={handleEditSubmit}>
                        <h2 className="edit-ingredient-form-title">Edit Ingredient</h2>
                            <ul className="edit-ingredient-form-wrapper">
                                <li className="edit-ingredient-form-row">
                                    <label>Icon:</label>
                                    <input type="text" name="icon" defaultValue={ingredientData.icon} onChange={handleChange}></input>
                                </li>
                                <li className="edit-ingredient-form-row">
                                    <label>Name:</label>
                                    <input type="text" name="name" defaultValue={ingredientData.name} onChange={handleChange}></input>
                                </li>
                                <li className="edit-ingredient-form-row">
                                    <label>Status:</label>
                                    <div class="select">
                                        <select id="standard-select" name="status" onChange={handleChange} defaultValue={ingredientData.status}>
                                            <option value="Available">Available</option>
                                            <option value="Low">Low</option>
                                            <option value="Out">Out</option>
                                        </select>
                                        <span class="focus"></span>
                                    </div>
                                </li>
                                <li className="edit-ingredient-form-row" >
                                    <label>Stored in the:</label>
                                    <div class="select" >
                                        <select id="standard-select" name="storage" defaultValue={ingredientData.storage} onChange={handleChange}>
                                            <option value="Fridge">Fridge</option>
                                            <option value="Freezer">Freezer</option>
                                            <option value="Pantry">Pantry</option>
                                        </select>
                                        <span class="focus"></span>
                                    </div>
                                </li>
                                <li className="edit-ingredient-form-row">
                                <button className="edit-ingredient-button">Save Changes
                                </button>
                                </li>
                            </ul>
                    </form>
                </div>
                <button onClick={onClose}>Close</button>
            </div> 
        </div>
        </>,
        document.getElementById('portal')
    )
};

export default EditIngredientModal;