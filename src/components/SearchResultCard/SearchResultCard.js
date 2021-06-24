import React, { useState } from 'react';
import IngredMatchTable from './IngredMatchTable'
import './Styles.scss';

const SearchResultCard = ( {recipe, kitchenIngreds, updateBackendSearchResult, resultArrIndex} ) => {
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

    let renderIngredTable = resultData.ingredients.map((resultIngredObj, i) => {
        return(
            <IngredMatchTable 
                key={i}
                resultArrIndex={resultArrIndex}
                ingredArrIndex={i}
                result={resultIngredObj}
                kitchenIngreds={kitchenIngreds}
                updateBackendSearchResult={updateBackendSearchResult}
            />
        )
    })

    return (
        <>
        <div className="accordion-item">
            <img className="search-result-accordion-image" src={resultData.image} alt="otherimage"/>
            <span className="accordion-status">
                <i className="fas fa-check-circle">
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
            <table className="layout display responsive-table">
                <thead>
                    <tr>
                        <th colSpan="2">Recipe Ingredients</th>
                        <th colSpan="3">Kitchen Ingredients</th>
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