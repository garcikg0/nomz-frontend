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
    }

    // const ingredMatch = () => {
    //     let kitchenIngredArr = kitchenIngreds.map((ingredObj) => {
    //         return ingredObj.name.toLowerCase()
    //     })
    //     let resultIngredArr = resultData.ingredientLines.map(str => str.toLowerCase())
    //     console.log(kitchenIngredArr)
    //     console.log(resultIngredArr)
    //     let kitchenIngredSet = new Set(kitchenIngredArr)
    //     let resultIngredSet = new Set(resultIngredArr)
    //     let ingredMatchSet = intersection(kitchenIngredSet, resultIngredSet)
    //     console.log(ingredMatchSet)
    //     const ingredMatchArr = (A,B) => {
    //         return B.filter(b=> A.some(a=> new RegExp(b,'i').test(a)))
    //     }
    //     console.log(stringSearchKMP(kitchenIngredArr, resultIngredArr))
    // }

    let renderIngredTable = resultData.ingredients.map((resultIngredObj) => {
        return(
            <IngredMatchTable 
                key={resultIngredObj.id}
                result={resultIngredObj}
                kitchenIngred={kitchenIngreds}
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
                    {renderIngredTable}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default SearchResultCard;