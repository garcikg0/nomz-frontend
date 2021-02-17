import React from 'react';
import './Styles.scss';
import ReactDom from 'react-dom'


const LoginModal = ( {open, onClose, loginData, setLoginData, handleLoginSubmit} ) => {
    if (!open) return null;

    const handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;

        setLoginData({
            ...loginData,
            [name]: value
        })
    };

    return ReactDom.createPortal(
        <>
        <div className="modal-overlay">
            <div className="modal">
                <div className="formBox">
                    <form className="login-form" onSubmit={handleLoginSubmit}>
                        <h2>Log In</h2>
                        <input className="login-input" type="text" name="username" placeholder="Username" onChange={handleChange}></input>
                        <input className="login-input" type="password" name="password" placeholder="Password" onChange={handleChange}></input>
                        <input className="login-button" type="submit" value="Login"></input>
                    </form>
                </div>
                <button className="login-button" onClick={onClose}>Close Modal</button>
            </div> 
        </div>
        </>,
        document.getElementById('portal')
    )
};

export default LoginModal;