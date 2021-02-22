import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Styles.scss';

const Navbar = ( { setIsLoginOpen, setIsSignupOpen, currentUser, handleLogout, kitchenRendered, setKitchenRendered, userKitchens} ) => {

    const [click, setClick] = useState(false)

    const handleClick = () => {
        let currentClick = click
        setClick( !currentClick)
    };

    const handleKitchenClick = e => {
        if (kitchenRendered === null){
            let kitchenToRender = userKitchens[0]
            setKitchenRendered(kitchenToRender)
        }
    }

    return (
        <nav className="NavbarItems">
            <Link to='/'>
            <h1 className="navbar-logo">Nomz</h1>
            </Link>
            <div className="menu-icon" onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                {currentUser ? (
                    <>
                    <li>
                        <Link to='/kitchen'>
                            <button class="nav-links" to='#kitchen'
                            onClick={handleKitchenClick}>My Kitchen</button>
                        </Link>
                    </li>
                    <li>
                        <Link to='recipesearch'>
                            <button class="nav-links" to='#recipesearch'>Recipe Search</button>
                        </Link>
                    </li>
                    <li>
                        <Link to='recipelibrary'>
                            <button class="nav-links" to='#recipelibrary'>My Recipe Library</button>
                        </Link>
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