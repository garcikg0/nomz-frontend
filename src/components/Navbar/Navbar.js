import React, { useState } from 'react';
import './Styles.scss';
// import { Button } from './Button';

const Navbar = ( { setIsLoginOpen, setIsSignupOpen, currentUser, handleLogout} ) => {

    const [click, setClick] = useState(false)

    const handleClick = () => {
        let currentClick = click
        setClick( !currentClick)
    };

    return (
        <nav className="NavbarItems">
            <h1 className="navbar-logo">Nomz</h1>
            <div className="menu-icon" onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                {currentUser ? (
                    <>
                    <li>
                        <button class="nav-links" to='#kitchen'>My Kitchen</button>
                    </li>
                    <li>
                        <button class="nav-links" to='#recipesearch'>Recipe Search</button>
                    </li>
                    <li>
                        <button class="nav-links" to='#recipelibrary'>My Recipe Library</button>
                    </li>
                    <li>
                        <button class="nav-links" onClick={handleLogout}>Logout</button>
                    </li>    
                </>
                ) : (
                    <>
                    <li>
                        <button class="nav-links" onClick={ () => setIsLoginOpen(true) } >Login</button>
                    </li>
                    <li>
                        <button class="nav-links" onClick={ () => setIsSignupOpen(true) }>Sign Up</button>
                    </li>
                    </>
                )}
            </ul>
        </nav>
    )
};

export default Navbar;