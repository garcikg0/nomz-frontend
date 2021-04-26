import React, { useState } from 'react';
import './Styles.scss';

const IngredMatchTable = ( {result, kitchenIngreds} ) => {
    const [resultIngred, setResultIngred] = useState({
        text: result.text,
        foodCategory: result.foodCategory,
        ingredMatch: [],
        ingredBlock: []
    })

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

    // let ingredMatch = () => {
    //     let matchArr = []
    //     for(let i = 0; i < kitchenIngreds.length; i++){ 

    //     }
    // }

    return (
        <>
        <tr>
            <td class="recipeingredient" colspan="2" rowspan="2">{result.text}</td>
            <td class="kitcheningredient" colspan="2">Test Kitchen Ingredient</td>
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
            <tr>
                {/* <td class="recipeingredient" colspan="2" rowspan="2">Test Recipe Ingredient</td>
                <td class="kitcheningredient" colspan="2">Test Kitchen Ingredient</td>
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
                </td> */}
        </tr>
        </>
    )
}

export default IngredMatchTable;