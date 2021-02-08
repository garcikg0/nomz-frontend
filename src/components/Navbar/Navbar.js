import React, { useEffect, useState } from 'react';
import './Styles.scss';
import { MenuItems } from './MenuItems';
// import { Button } from './Button';

const Navbar = () => {

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
                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <a className={item.cName} href={item.url}>
                            {item.title}
                            </a>
                        </li>
                    )
                })}    
            </ul>
        </nav>
    )
};

export default Navbar;