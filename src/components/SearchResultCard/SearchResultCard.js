import React, { useState } from 'react';
import IngredMatchTable from './IngredMatchTable'
import './Styles.scss';

const SearchResultCard = ( {recipe, kitchenIngreds} ) => {
    const [resultData, setResultData] = useState({
        title: recipe.name,
        image: recipe.image,
        source: recipe.source,
        url: recipe.url,
        ingredientLines: recipe.ingredientLines,
        ingredients: recipe.ingredients
    })
    
    const [showIngred, setShowIngred] = useState(false);


    const activeStatus = showIngred ? 'active' : '';

    const handleIngredClick = e => {
        e.preventDefault()
        setShowIngred(!showIngred)
        // console.log(resultData)
    }

    let renderIngredTable = resultData.ingredients.map((resultIngredObj) => {
        return(
            <IngredMatchTable 
                key={resultIngredObj.id}
                result={resultIngredObj}
                kitchenIngreds={kitchenIngreds}
            />
        )
    })

    return (
        <>
        <div className="accordion-item">
            <img className="search-result-accordion-image" src={resultData.image} alt="otherimage"/>
            <span className="accordion-status">
                <i class="fas fa-check-circle">
                    <h4 className="accordion-status-text">Available</h4>
                </i>
            </span>
            <span className="accordion-title">
                {resultData.title}
            </span>
            <span className="accordion-source">
                {resultData.source}
            </span>
            <button className="accordion-ingred-btn" onClick={handleIngredClick}>Ingredients</button>
            <button className="accordion-instruct-btn" onClick={() => window.open(resultData.url, "_blank") }>Instructions and More Info</button>
            <button className="accordion-save-btn" >Save</button>
        </div>
        <div className={`accordion-ingred-content ${activeStatus}`}>
            <table class="layout display responsive-table">
                <thead>
                    <tr>
                        <th colspan="2">Recipe Ingredients</th>
                        <th colspan="3">Kitchen Ingredients</th>
                    </tr>
                </thead>
                <tbody>   
                    {renderIngredTable}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default SearchResultCard;