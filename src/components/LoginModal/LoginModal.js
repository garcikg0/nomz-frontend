import React from 'react';
import './Styles.scss';
import ReactDom from 'react-dom'


const LoginModal = ( {open, onClose} ) => {
    if (!open) return null;
    return ReactDom.createPortal(
        <>
        <div className="modal-overlay">
            <div className="modal">
                <div className="formBox">
                    <form className="login-form">
                        <h2>Log In</h2>
                        <input className="login-input" type="text" name="" placeholder="Username"></input>
                        <input className="login-input" type="password" name="" placeholder="Password"></input>
                        <input className="login-button" type="submit" name="" value="Login"></input>
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