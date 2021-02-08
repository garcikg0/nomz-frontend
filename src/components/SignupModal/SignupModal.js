import React from 'react';
import './Styles.scss';
import ReactDom from 'react-dom'


const SignupModal = ( {open, onClose} ) => {
    if (!open) return null;
    return ReactDom.createPortal(
        <>
        <div className="modal-overlay">
            <div className="modal">
                <div className="formBox">
                    <form className="signup-form">
                        <h2>Create an Account</h2>
                        <input className="signup-input" type="text" name="" placeholder="First Name"></input>
                        <input className="signup-input" type="text" name="" placeholder="Last Name"></input>
                        <input className="signup-input" type="email" name="" placeholder="Email Address"></input>
                        <input className="signup-input" type="password" name="" placeholder="Password"></input>
                        <input className="signup-button" type="submit" name="" value="Sign Up"></input>
                    </form>
                </div>
                <button className="signup-button" onClick={onClose}>Close Modal</button>
            </div> 
        </div>
        </>,
        document.getElementById('portal')
    )
};

export default SignupModal;