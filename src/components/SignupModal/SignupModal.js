import React from 'react';
import './Styles.scss';
import ReactDom from 'react-dom'


const SignupModal = ( {open, onClose, signupData, setSignupData, handleSignup} ) => {
    if (!open) return null;

    const handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;

        setSignupData({
            ...signupData,
            [name]: value
        })
    };

    return ReactDom.createPortal(
        <>
        <div className="modal-overlay">
            <div className="modal">
                <div className="formBox">
                    <form className="signup-form" onSubmit={handleSignup}>
                        <h2>Create an Account</h2>
                        <input className="signup-input" type="text" name="first_name" placeholder="First Name" onChange={handleChange}></input>
                        <input className="signup-input" type="text" name="last_name" placeholder="Last Name" onChange={handleChange}></input>
                        <input className="signup-input" type="email" name="email" placeholder="Email Address" onChange={handleChange}></input>
                        <input className="signup-input" type="text" name="username" placeholder="Username" onChange={handleChange}></input>
                        <input className="signup-input" type="password" name="password" placeholder="Password" onChange={handleChange}></input>
                        <input className="signup-button" type="submit" value="Sign Up"></input>
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