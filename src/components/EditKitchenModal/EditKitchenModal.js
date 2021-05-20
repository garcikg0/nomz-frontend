import React from 'react';
import './Styles.scss';
import ReactDom from 'react-dom'


const EditKitchenModal = ( {open, onClose, kitchenData, setKitchenData, editedKitchens} ) => {

    if (!open) return null;

    const handleEditSubmit = (evt) => {
        evt.preventDefault()
        fetch(`http://localhost:3000/kitchens/${kitchenData.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(kitchenData)
        })
        editedKitchens(kitchenData)
        onClose()
    }

    const handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;

        setKitchenData({
            ...kitchenData,
            [name]: value
        })
    };

    return ReactDom.createPortal(
        <>
        <div className="modal-overlay">
            <div className="modal">
                <div className="formBox">
                    <form className="login-form" onSubmit={handleEditSubmit}>
                        <h2>Edit Kitchen</h2>
                        <label className="login-input">Kitchen Name:</label>
                        <input className="login-input" type="text" name="name" defaultValue={kitchenData.name} onChange={handleChange}></input>
                        <input className="login-button" type="submit" value="Save"></input>
                    </form>
                </div>
                <button className="login-button" onClick={onClose}>Close Modal</button>
            </div> 
        </div>
        </>,
        document.getElementById('portal')
    )
};

export default EditKitchenModal;