import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import './Styles.scss';

const KitchenNavbar = (  ) => {

    const [click, setClick] = useState(false)

    const handleClick = () => {
        let currentClick = click
        setClick( !currentClick)
    };

    return (
    <nav className="KitchenNavbarItems">
            <span className="kitchen-navbar-logo">Kitchen Name</span>
    </nav>
    )
};

export default KitchenNavbar;