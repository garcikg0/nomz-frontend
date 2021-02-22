import React, { useState }from 'react';
import './Styles.scss';
import ReactDom from 'react-dom'


const AddIngredientModal = ( { open, onClose, kitchenUser, setKitchenUser } ) => {

    const [newIngredientData, setNewIngredientData] = useState(null)

    if (!open) return null;

    if (localStorage) {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/kitchenuser`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(r => r.json())
        .then( data => {
            setKitchenUser(data)
        })
        console.log(kitchenUser)
    }

    // const handleSubmit = (evt) => {
    //     evt.preventDefault()
    //     let newKitchenToBackend = newKitchenData 
    //     fetch(`http://localhost:3000/kitchens`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(newKitchenToBackend)
    //     })
    //     .then(r => r.json())
    //     .then((newKitchen) => {
    //         addKitchen(newKitchen)
    //     })
    //     onClose()
    // }

    const handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;

        // setNewKitchenData({
        //     [name]: value,
        //     user_id: kitchenUser
        // })
    };

    return ReactDom.createPortal(
        <>
        <div className="add-ingredient-modal-overlay">
            <div className="add-ingredient-modal">
                <div className="add-ingredient-form-wrapper">
                    <form className="add-ingredient-form">
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
                                <input type="text-area" name="storage" onChange={handleChange}></input>
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

{/* <>
        <div className="add-ingredient-modal-overlay">
            <div className="add-ingredient-modal">
                <div className="add-ingredient-form-wrapper">
                    <form className="add-ingredient-login-form">
                        <h2>Add An Ingredient</h2>
                        <label className="add-ingredient-login-label">Ingredient Name:</label>
                        <span>
                            <input className="add-ingredient-login-input" type="text" name="name" placeholder="Name of Ingredient" onChange={handleChange}></input>
                        </span>
                        <label className="add-ingredient-login-label">Ingredient Status:
                            <input className="add-ingredient-login-input" type="text" name="status" placeholder="Available, Running Low, Out" onChange={handleChange}></input>
                        </label>
                        <label className="add-ingredient-login-label">Stored in the:
                            <input className="add-ingredient-login-input" type="text" name="storage" placeholder="Available, Running Low, Out" onChange={handleChange}></input>
                        </label>
                        <label className="add-ingredient-login-label">Icon:
                            <input className="add-ingredient-login-input" type="text" name="icon" placeholder="future dropdown" onChange={handleChange}></input>
                        </label>
                        <label className="add-ingredient-login-label">Notes:
                            <input className="add-ingredient-login-input" type="text" name="notes" placeholder="Available, Running Low, Out" onChange={handleChange}></input>
                        </label>
                        <input className="add-ingredient-button" type="submit" value="Save"></input>
                    </form>
                </div>
                <button className="login-button" onClick={onClose}>Close Modal</button>
            </div> 
        </div>
        </>, */}