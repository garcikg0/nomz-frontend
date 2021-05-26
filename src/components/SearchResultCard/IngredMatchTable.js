import React, { useEffect, useState } from 'react';
import IngredMatchCell from './IngredMatchCell';
import './Styles.scss';

const IngredMatchTable = ( {result, kitchenIngreds} ) => {
  const [resultIngred, setResultIngred] = useState({
    text: result.text,
    foodCategory: result.foodCategory
  });
  const [prelimIngredMatch, setPrelimIngredMatch] = useState([]);
  const [ingredMatch, setIngredMatch] = useState(null);
  const [ingredBlock, setIngredBlock] = useState(null);
  const [matchRowspan, setMatchRowspan] = useState(null);

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
        } else if (wordIndex > -1) {
          wordIndex = patternTable[wordIndex - 1];
        } else {
          wordIndex = 0;
          stringIndex++
        }
      }
    return -1;
  }
  
  useEffect(() => {
    // debugger
      if(!ingredMatch && !ingredBlock){
          const matches = new Map();
          for(let i = 0; i < kitchenIngreds.length; i++) {
              let word = kitchenIngreds[i].name.toLowerCase()
              let string = resultIngred.text.toLowerCase()
              // debugger
              if (stringSearchKMP(string, word) > -1){
                  matches.set(kitchenIngreds[i].id, kitchenIngreds[i].name)
              }
          }
      setPrelimIngredMatch(matches)
      setMatchRowspan(matches.size + 1)
      // debugger
      }
  }, [kitchenIngreds])

  const handleIngredMatchClick = (ingredObj, e) => {
    e.preventDefault()
    let id = ingredObj[0]
    fetch(`http://localhost:3000/ingredients/${id}`, {
      method: "GET",
      headers: {
        "Content-Type" : "application/json"
      }
    })
    .then(r => r.json())
    .then((ingredObj) => {
      console.log(ingredObj)
      setIngredMatch(ingredObj)
    })
    }

  const handleAddToGroceryList = e => {
    e.preventDefault()
    console.log(ingredMatch)
  }

  const handleIngredBlockClick = e => {
    e.preventDefault()
    console.log(prelimIngredMatch)
  }
  
  if (prelimIngredMatch.size <= 0 && !ingredMatch) {
    return (
      <tr>
        <td class="recipeingredient" colspan="2" rowspan="1">{result.text}</td>
        <td class="kitcheningredient" colspan="2">No Matches Found in Your Kitchen</td>
        <td class="actions">
          <a class="add-item" title="Add">
            <i class="fas fa-plus-circle"></i>
          </a>
        </td>
      </tr>
    );
  } else if (ingredMatch) {
    return(
      <tr>
        <td class="recipeingredient" colspan="2" rowspan="1">{result.text}</td>
        <td class="kitcheningredient" colspan="2">{ingredMatch.name}</td>
        <td class="actions">
          <a class="matched-item" title="Match" onClick={handleIngredMatchClick}>
            <i class="fas fa-check"></i>
          </a>
          <a class="undo" title="undo">
            <i class="fas fa-undo"></i>
          </a>
        </td>
      </tr>
    )
  } else {
      return(
        <>
        <td class="recipeIngredient" colspan="2" rowSpan={matchRowspan}>{result.text}
        </td>
        <IngredMatchCell
        prelimIngredMatch={prelimIngredMatch}
        ingredMatchClick={handleIngredMatchClick}
        ingredBlockClick={handleIngredBlockClick}
        />
        </>
      )
    }
}

export default IngredMatchTable;