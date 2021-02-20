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
                <div className="add-ingredient-formBox">
                    <form className="add-ingredient-login-form">
                        <h2>Add An Ingredient</h2>
                        <label className="add-ingredient-login-input">Ingredient Name:</label>
                        <input className="add-ingredient-login-input" type="text" name="name" placeholder="Name of Ingredient" onChange={handleChange}></input>
                        <label className="add-ingredient-login-input">Ingredient Status:</label>
                        <input className="add-ingredient-login-input" type="text" name="status" placeholder="Available, Running Low, Out" onChange={handleChange}></input>
                        <label className="add-ingredient-login-input">Stored in the:</label>
                        <input className="add-ingredient-login-input" type="text" name="storage" placeholder="Available, Running Low, Out" onChange={handleChange}></input>
                        <label className="add-ingredient-login-input">Icon:</label>
                        <input className="add-ingredient-login-input" type="text" name="icon" placeholder="future dropdown" onChange={handleChange}></input>
                        <label className="add-ingredient-login-input">Notes:</label>
                        <input className="add-ingredient-login-input" type="text" name="notes" placeholder="Available, Running Low, Out" onChange={handleChange}></input>
                        <input className="add-ingredient-button" type="submit" value="Save"></input>
                    </form>
                </div>
                <button className="login-button" onClick={onClose}>Close Modal</button>
            </div> 
        </div>
        </>,
        document.getElementById('portal')
    )
};

export default AddIngredientModal;