import React, { useState } from 'react';
import './Styles.scss';

const KitchenNavbar = ( {kitchenRendered, userKitchens, setKitchenRendered, setIngredientsOfKitchenRendered} ) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogoClick = e => {
        setDropdownOpen(!dropdownOpen)
    };

    const handleKitchenNameClick = e => {
        let id = e.target.value
        let newKitchenRendered = null
        for(let i = 0; i < userKitchens.length; i++){
            if(userKitchens[i].id === id){
                newKitchenRendered = userKitchens[i]
            }
        }
        setKitchenRendered(newKitchenRendered)
        setIngredientsOfKitchenRendered(newKitchenRendered.ingredients)
        setDropdownOpen(false)
    };

    let index = 1;
    let kitchenNames = userKitchens.map((kitchen) => {
        if (kitchen.name !== kitchenRendered.name){
            const itemStyle = {
                "top": `${index* 3}rem`,
            }
            index = index + 1
            return(
                <li className="m-item"
                    key={kitchen.id}
                    value={kitchen.id}
                    style={dropdownOpen ? itemStyle : null}
                    onClick={handleKitchenNameClick}
                >{kitchen.name}</li>
            )
        };
    });
    
    return (
    <nav className="KitchenNavbarItems">
            <div className="kitchen-navbar-logo" 
                onClick={handleLogoClick}>
                    {kitchenRendered.name}
            </div>
            {dropdownOpen ? kitchenNames : null }
    </nav>
    )
};

export default KitchenNavbar;