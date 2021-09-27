import React, { useState, useEffect }from 'react';
import './Styles.scss';
import ReactDom from 'react-dom'


const SearchIngredientModal = ( { open, onClose, kitchenRendered, addIngredient, ingredData, updateBackendIngredMatch } ) => {

    const [newIngredientData, setNewIngredientData] = useState({
        name: "",
        storage: "",
        icon: "",
        status: "",
        notes: "",
        kitchen_id: ""
    })
    const [resultArrIndex, setResultArrIndex] = useState(null)
    const [ingredArrIndex, setIngredArrIndex] = useState(null)

    useEffect(() => {
        if(ingredData){
            setNewIngredientData({
                name: "" ,
                storage: "",
                icon: "",
                status: "",
                notes: "",
                kitchen_id: kitchenRendered.id
            })
            setResultArrIndex(ingredData.resultArrIndex)
            setIngredArrIndex(ingredData.ingredArrIndex)
        } 
    }, [ingredData])

    if (!open) return null;

    const handleSubmit = (evt) => {
        evt.preventDefault()
        let newIngredientToBackend = newIngredientData
        fetch(`http://localhost:3000/ingredients`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newIngredientToBackend)
        })
        .then(r => r.json())
        .then(newIngredient => {
            let ingredMatchObj = newIngredient
            addIngredient(newIngredient)
            updateBackendIngredMatch(resultArrIndex, ingredArrIndex, ingredMatchObj)
        })
        onClose()
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
                                <input type="text" name="name" value={newIngredientData.name} onChange={handleChange}></input>
                            </li>
                            <li className="form-row">
                                <label>Status:</label>
                                <div class="select">
                                        <select id="standard-select" name="status" value={newIngredientData.status} onChange={handleChange}>
                                            <option value=" "> </option>
                                            <option value="Available">Available</option>
                                            <option value="Low">Low</option>
                                            <option value="Out">Out</option>
                                        </select>
                                        <span class="focus"></span>
                                    </div>
                            </li>
                            <li className="form-row">
                                <label>Stored in the</label>
                                <div class="select" >
                                        <select id="standard-select" name="storage" onChange={handleChange}>
                                            <option value=" "> </option>
                                            <option value="Fridge">Fridge</option>
                                            <option value="Freezer">Freezer</option>
                                            <option value="Pantry">Pantry</option>
                                        </select>
                                        <span class="focus"></span>
                                    </div>
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

export default SearchIngredientModal;