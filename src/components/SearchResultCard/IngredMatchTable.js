import React, { useEffect, useState } from 'react';
import './Styles.scss';

const IngredMatchTable = ( {result, kitchenIngreds} ) => {
  const [resultIngred, setResultIngred] = useState({
    text: result.text,
    foodCategory: result.foodCategory
  });
  const [prelimIngredMatch, setPrelimIngredMatch] = useState([]);
  const [ingredMatch, setIngredMatch] = useState(null);
  const [ingredBlock, setIngredBlock] = useState(null);

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
   
  // const ingredMatchFunction = e => {
  //     // e.preventDefault()
  //     const matches = new Map();
  //     for(let i = 0; i < kitchenIngreds.length; i++) {
  //         let word = kitchenIngreds[i].name.toLowerCase()
  //         let string = resultIngred.text.toLowerCase()
  //         // debugger
  //         if (stringSearchKMP(string, word) > 0){
  //             matches.set(kitchenIngreds[i].id, kitchenIngreds[i].name)
  //         }
  //     }
  //     console.log(matches)
  // }
  
  useEffect(() => {
      if(!ingredMatch && !ingredBlock){
          const matches = new Map();
          for(let i = 0; i < kitchenIngreds.length; i++) {
              let word = kitchenIngreds[i].name.toLowerCase()
              let string = resultIngred.text.toLowerCase()
              // debugger
              if (stringSearchKMP(string, word) > 0){
                  matches.set(kitchenIngreds[i].id, kitchenIngreds[i].name)
              }
          }
      setPrelimIngredMatch(matches)
      }
  }, [])

  const printState = e => {
      e.preventDefault()
      // debugger
      console.log(prelimIngredMatch)
      
  }

  const renderKitchenIngreds = prelimIngredMatch.map((ingredObj) => {
    // debugger
      return(
          <>
          <td class="recipeingredient" colspan="2" rowspan={prelimIngredMatch.size}>{result.text}</td>
          <td class="kitcheningredient" colspan="2">{ingredObj}</td>
          <td class="actions">
              <button class="edit-item" title="Edit" onClick={printState}>Test</button>
              <a class="remove-item" title="Remove">Remove</a>
          </td>
          </>
      )
  })

  const renderNoMatch = (result) => {
      return(
          <>
          <td class="recipeingredient" colspan="2" rowspan="1">{result.text}</td>
          <td class="kitcheningredient" colspan="2">No Matches Found in Your Kitchen</td>
          <td class="actions">
              <button class="edit-item" title="Edit" onClick={printState}>Test</button>
              <a class="remove-item" title="Remove">Remove</a>
          </td>
          </>
      )
  }

  return (
      <tr>
        {renderNoMatch(result)}
        {/* {prelimIngredMatch ? 
          {renderKitchenIngreds}
          : 
          renderNoMatch(resultIngred)
        } */}
      </tr>
  )

}

export default IngredMatchTable;