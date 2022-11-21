import React, { useEffect, useState } from 'react';
import IngredMatchTable from './IngredMatchTable'
import AvailabilityStatus from './AvailabilityStatus';
import './Styles.scss';

const SearchResultCard = ( {recipe, kitchenIngreds, updateBackendIngredMatch, resultArrIndex, kitchenRenderedId, updateBackendIngredBlock, undoBackendIngredMatch, setAddIngredientData, setIsAddIngredientOpen, isSearchIngredientOpen ,setIsSearchIngredientOpen, setSearchIngredData} ) => {
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

    const [ingredMatchCount, setIngredMatchCount] = useState(0)

    const handleIngredClick = e => {
        e.preventDefault()
        setShowIngred(!showIngred)
    }

    useEffect(() => {
        setResultData({
            title: recipe.name,
            image: recipe.image,
            source: recipe.source,
            url: recipe.url,
            ingredientLines: recipe.ingredientLines,
            ingredients: recipe.ingredients
        })
    }, [recipe])

    let renderIngredTable = resultData.ingredients.map((resultIngredObj, i) => {
        return(
            <IngredMatchTable 
                key={i}
                resultArrIndex={resultArrIndex}
                ingredArrIndex={i}
                result={resultIngredObj}
                kitchenIngreds={kitchenIngreds}
                kitchenRenderedId={kitchenRenderedId}
                updateBackendIngredMatch={updateBackendIngredMatch}
                updateBackendIngredBlock={updateBackendIngredBlock}
                undoBackendIngredMatch={undoBackendIngredMatch}
                setIsAddIngredientOpen={setIsAddIngredientOpen}
                setAddIngredientData={setAddIngredientData}
                isSearchIngredientOpen={isSearchIngredientOpen}
                setIsSearchIngredientOpen={setIsSearchIngredientOpen}
                setSearchIngredData={setSearchIngredData}
            />
        )
    })

    return (
        <>
        <div className="accordion-item">
            <img className="search-result-accordion-image" src={resultData.image} alt="no-img"
            onError={e => {
                e.target.src="https://thenounproject.com/api/private/icons/3674270/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABje_Swn7_rWzZ1u3vqQ-fMpRAFjwG7xYIWN_w0gFvwLqp9Sh2vjfJ3VsHRkhXI8dW0-9kkO1fuvUzXN3SuZlkK6z0BLQ%3D%3D"
                e.onError = null
            }}
            />
            <span className="accordion-status">
                <AvailabilityStatus 
                resultCount={resultData.ingredients.length}
                ingredMatchCount={ingredMatchCount}
                setIngredMatchCount={setIngredMatchCount}
                />
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
                        <th colSpan="2" >Recipe Ingredients</th>
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