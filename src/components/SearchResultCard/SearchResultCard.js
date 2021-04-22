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

    var makeKMPTable = function(word) {
        if(Object.prototype.toString.call(word) == '[object String]' ) {
            word = word.split('');
        }
        var results = [];
        var pos = 2;
        var cnd = 0;
    
        results[0] = -1;
        results[1] = 0;
        while (pos &lt; word.length) {
            if (word[pos - 1] == word[cnd]) {
                cnd++;
                results[pos] = cnd;
                pos++;
            } else if (cnd &gt; 0) {
                cnd = results[cnd];
            } else {
                results[pos] = 0;
                pos++;
            }
        }
        return results;
    };
    
    var KMPSearch = function(string, word) {
        if(Object.prototype.toString.call(string) == '[object String]' ) {
            string = string.split('');
        }
        if(Object.prototype.toString.call(word) == '[object String]' ) {
            word = word.split('');
        }
    
        var index = -1;
        var m = 0;
        var i = 0;
        var T = makeKMPTable(word);
    
        while (m + i &lt; string.length) {
            if (word[i] == string[m + i]) {
                if (i == word.length - 1) {
                    return m;
                }
                i++;
            } else {
                m = m + i - T[i];
                if (T[i] &gt; -1) {
                    i = T[i];
                } else {
                    i = 0;
                }
            }
        }
        return index;
    };
    
    var test = 'potential';
    
    var string = "This fact implies that the loop can execute at most 2n times. For, in each iteration, it " +
        "executes one of the two branches in the loop. The first branch invariably increases i and does not " +
        "change m, so that the index m + i of the currently scrutinized character of S is increased. The second " +
        "branch adds i - T[i] to m, and as we have seen, this is always a positive number. Thus the location m " +
        "of the beginning of the current potential match is increased. Now, the loop ends if m + i = n; " +
        "therefore each branch of the loop can be reached at most k times, since they respectively increase " +
        "either m + i or m, and m = m + i: if m = n, then certainly m + i = n, so that since it increases by " +
        "unit increments at most, we must have had m + i = n at some point in the past, and therefore either " +
        "way we would be done.";
    
    let result = KMPSearch(string, test);
    console.log(result)
    

    // const intersection = (setA, setB) => {
    //     let newSet = new Set()
    //     for (let elem of setA) {
    //         if (setB.has(elem)) {
    //             newSet.add(elem)
    //         }
    //     }
    //     return newSet
    // }


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
        console.log(ingredMatchArr(kitchenIngredArr, resultIngredArr))
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