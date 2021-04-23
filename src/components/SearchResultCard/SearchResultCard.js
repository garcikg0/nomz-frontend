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

    const buildPatternTable = (word) => {
        const patternTable = [0];
        let prefixIndex = 0;
        let suffixIndex = 1;
      
        while (suffixIndex < word.length) {
          if (word[prefixIndex] === word[suffixIndex]) {
            patternTable[suffixIndex] = prefixIndex + 1;
            suffixIndex++;
            prefixIndex++;
          } else if (prefixIndex === 0) {
            patternTable[suffixIndex] = 0;
            suffixIndex++
          } else {
            prefixIndex = patternTable[prefixIndex - 1]
          }
        }
        return patternTable;
    }

    const stringSearchKMP = (string, word) => {
        if (word.length === 0) {
          return -1;
        }
      
        let stringIndex = 0;
        let wordIndex = 0
      
        const patternTable = buildPatternTable(word);
      
        while (stringIndex < string.length) {
          if (string[stringIndex] === word[wordIndex]) { //Found a Match
            if (wordIndex === word.length - 1) {
              return (stringIndex - word.length) + 1;
            }
            wordIndex++;
            stringIndex++;
          } else if (wordIndex > 0) {
            wordIndex = patternTable[wordIndex - 1];
          } else {
            wordIndex = 0;
            stringIndex++
          }
        }
        return -1;
    }

    const ingredMatch = () => {
        let kitchenIngredArr = kitchenIngreds.map((ingredObj) => {
            return ingredObj.name.toLowerCase()
        })
        let resultIngredArr = resultData.ingredientLines.map(str => str.toLowerCase())
        console.log(kitchenIngredArr)
        console.log(resultIngredArr)
        // let kitchenIngredSet = new Set(kitchenIngredArr)
        // let resultIngredSet = new Set(resultIngredArr)
        // let ingredMatchSet = intersection(kitchenIngredSet, resultIngredSet)
        // console.log(ingredMatchSet)
        const ingredMatchArr = (A,B) => {
            return B.filter(b=> A.some(a=> new RegExp(b,'i').test(a)))
        }
        console.log(stringSearchKMP(kitchenIngredArr, resultIngredArr))
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