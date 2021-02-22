import React, { useState }from 'react';
import './Styles.scss';
import ReactDom from 'react-dom'


const AddIngredientModal = ( { open, onClose, kitchenRendered, addIngredient } ) => {

    const [newIngredientData, setNewIngredientData] = useState(null)

    if (!open) return null;

    const handleSubmit = (evt) => {
        evt.preventDefault()
        debugger
        fetch(`http://localhost:3000/ingredients`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newIngredientData)
        })
        addIngredient(newIngredientData)
        onClose()
        setNewIngredientData(null)
    }

    const handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;

        setNewIngredientData({
            ...newIngredientData,
            [name]: value,
            kitchen_id: kitchenRendered.id
        })
    };

    return ReactDom.createPortal(
        <>
        <div className="add-ingredient-modal-overlay">
            <div className="add-ingredient-modal">
                <div className="add-ingredient-form-wrapper">
                    <form className="add-ingredient-form" onSubmit={handleSubmit}>
                        <h2 className="form-title">Add an Ingredient</h2>
                        <ul className="wrapper">
                        <li className="form-row">
                                <label>Icon:</label>
                                <input type="text" name="icon" onChange={handleChange}></input>
                            </li>
                            <li className="form-row">
                                <label>Name of Ingredient:</label>
                                <input type="text" name="name" onChange={handleChange}></input>
                            </li>
                            <li className="form-row">
                                <label>Status:</label>
                                <input type="text" name="status" onChange={handleChange}></input>
                            </li>
                            <li className="form-row">
                                <label>Stored in the</label>
                                <input type="text" name="storage" onChange={handleChange}></input>
                            </li>
                            <li className="form-row">
                                <label>Notes:</label>
                                <input type="text" name="notes" onChange={handleChange}></input>
                            </li>
                            <li className="form-row">
                                <button className="add-ingredient-button" type="submit">Save</button>
                            </li>
                        </ul>
                    </form>
                </div>
                <button className="login-button" onClick={onClose}>Close</button>
            </div> 
        </div>
        </>,
        document.getElementById('portal')
    )
};

export default AddIngredientModal;