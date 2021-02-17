import React from 'react';
import './Styles.scss';
import ReactDom from 'react-dom'


const AddKitchenModal = ( {open, onClose, setKitchenUser, kitchenUser } ) => {

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
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        console.log(kitchenUser) //user.id
        // onClose()
    }

    const handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;

        // setKitchenData({
        //     ...kitchenData,
        //     [name]: value
        // })
    };

    return ReactDom.createPortal(
        <>
        <div className="modal-overlay">
            <div className="modal">
                <div className="formBox">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h2>Add Kitchen</h2>
                        <label className="login-input">Kitchen Name:</label>
                        <input className="login-input" type="text" name="name" placeholder="Kitchen Name" onChange={handleChange}></input>
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

export default AddKitchenModal;