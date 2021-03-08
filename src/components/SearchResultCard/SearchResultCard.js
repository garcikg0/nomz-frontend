import React, { useState } from 'react';
import './Styles.scss';

const SearchResultCard = () => {
    const [showIngred, setShowIngred] = useState(false);

    const activeStatus = showIngred ? 'active' : '';

    const handleIngredClick = e => {
        e.preventDefault()
        setShowIngred(!showIngred)
    }

    return (
        <>
        <div className="accordion-item">
            <img className="search-result-accordion-image" src="https://www.edamam.com/web-img/dee/dee4fefbf3d4d11e68134ed503d5532f.jpg" alt="otherimage"/>
            <span className="accordion-status">
                <i class="fas fa-check-circle">
                    <h4 className="accordion-status-text">Available</h4>
                </i>
            </span>
            <span className="accordion-title">
                Honey Baked Chicken Recipe
            </span>
            <span className="accordion-source">
                From Serious Eats
            </span>
            <button className="accordion-ingred-btn" onClick={handleIngredClick}>Ingredients</button>
            <button className="accordion-instruct-btn">Instructions</button>
            <button className="accordion-save-btn">Save</button>
        </div>
        <div className={`accordion-ingred-content ${activeStatus}`}>
            <p>Test</p>
        </div>
        </>
    )
}

export default SearchResultCard;