import React, { useState } from 'react';
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
        console.log(resultData)
        // console.log(kitchenIngreds)
        ingredMatch()
    }

    let ingredMatch = () => {
        let kitchenIngredArr = kitchenIngreds.map((ingredObj) => {
            debugger
            return ingredObj.name.toLowerCase()
        })
        let resultIngredArr = resultData.ingredientLines.map(str => str.toLowerCase())
    }

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
            <button className="accordion-instruct-btn" onClick={() => window.open(resultData.url, "_blank") }>Instructions & More Info</button>
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
                    <tr>
                        <td class="recipeingredient" colspan="2" rowspan="2">Test Recipe Ingredient</td>
                        <td class="kitcheningredient" colspan="2">Tetst Kitchen Ingredient</td>
                        <td class="actions">
                            <a class="edit-item" title="Edit">Edit</a>
                            <a class="remove-item" title="Remove">Remove</a>
                        </td>
                    </tr>
                    <tr>
                    <td class="kitcheningredient" colspan="2">Tetst Kitchen Ingredient</td>
                        <td class="actions">
                            <a class="edit-item" title="Edit">Edit</a>
                            <a class="remove-item" title="Remove">Remove</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </>
    )
}

export default SearchResultCard;