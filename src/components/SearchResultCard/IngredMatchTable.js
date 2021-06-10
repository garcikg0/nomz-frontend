import React, { useEffect, useState } from 'react';
import IngredMatchCell from './IngredMatchCell';
import './Styles.scss';

const IngredMatchTable = ( {result, kitchenIngreds} ) => {
  const [resultIngred, setResultIngred] = useState({
    text: result.text,
    foodCategory: result.foodCategory,
    ingredMatch: null,
    ingredBlock: null
  });
  const [prelimIngredMatch, setPrelimIngredMatch] = useState([]);
  const [ingredMatch, setIngredMatch] = useState(null);
  const [ingredBlock, setIngredBlock] = useState(null);
  const [matchRowspan, setMatchRowspan] = useState(null);

  if (result.ingredMatch && result.ingredBlock){
    setResultIngred({
      text: result.text,
      foodCategory: result.foodCategory,
      ingredMatch: result.ingredMatch,
      ingredBlock: result.ingredBlock
    })
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
      // if match is found
        if (string[stringIndex] === word[wordIndex]) { 
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
      if(!ingredMatch && !ingredBlock){
          const matches = new Map();
          for(let i = 0; i < kitchenIngreds.length; i++) {
              let word = kitchenIngreds[i].name.toLowerCase()
              let string = resultIngred.text.toLowerCase()
              if (stringSearchKMP(string, word) > -1){
                  matches.set(kitchenIngreds[i].id, kitchenIngreds[i].name)
              }
          }
      setPrelimIngredMatch(matches)
      setMatchRowspan(matches.size + 1)
      }  
  }, [kitchenIngreds, ingredBlock])

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

  const handleIngredBlockClick = (ingredObj, e) => {
    e.preventDefault()
    let id = ingredObj[0]
    let ingredBlockMap = new Map();
    ingredBlockMap.set(id, ingredObj[1])
    setIngredBlock(ingredBlockMap)
    prelimIngredMatch.delete(id)
    console.log(prelimIngredMatch)
    console.log(ingredBlock)
    let newMatchRowSpan = matchRowspan - 1
    setMatchRowspan(newMatchRowSpan)
    console.log(prelimIngredMatch.size)
  }
  
  if (prelimIngredMatch.size <= 0 && !ingredMatch && !ingredBlock) {
    return (
      <tr>
        <td className="recipeingredient" colSpan="2" rowSpan="1">{result.text}</td>
        <td className="kitcheningredient" colSpan="2">No Matches Found in Your Kitchen</td>
        <td className="actions">
          <a className="add-item" title="Add">
            <i className="fas fa-plus-circle"></i>
          </a>
        </td>
      </tr>
    );
  } else if (ingredMatch) {
    return(
      <tr>
        <td className="recipeingredient" colSpan="2" rowSpan="1">{result.text}</td>
        <td className="kitcheningredient" colSpan="2">{ingredMatch.name}</td>
        <td className="actions">
          <a className="matched-item" title="Match" onClick={handleIngredMatchClick}>
            <i className="fas fa-check"></i>
          </a>
          <a className="undo" title="undo">
            <i className="fas fa-undo"></i>
          </a>
        </td>
      </tr>
    )
  } else {
      return(
        <>
        <td className="recipeIngredient" colSpan="2" rowSpan={matchRowspan}>{result.text}
        </td>
        <IngredMatchCell
        prelimIngredMatch={prelimIngredMatch}
        ingredBlock={ingredBlock}
        ingredMatchClick={handleIngredMatchClick}
        ingredBlockClick={handleIngredBlockClick}
        />
        </>
      )
    }
}

export default IngredMatchTable;