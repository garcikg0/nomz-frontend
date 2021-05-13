import React, { useEffect, useState } from 'react';
import './Styles.scss';

const IngredMatchCell = ( {prelimIngredMatch} ) => {
    const [prelimIngredMatches, setPrelimIngredMatches] = useState([])
    // const [prelimIngredMatches, setPrelimIngredMatches] = useState(prelimIngredMatch)

    useEffect(() => {
        if(prelimIngredMatches.length < 1){
            let arr = Array.from(prelimIngredMatch)
            // debugger
            setPrelimIngredMatches(arr)
        }
    }, [prelimIngredMatches])

    const printState = e => {
        e.preventDefault()
        // debugger
        console.log(prelimIngredMatch)
      }
    
    let renderPrelimIngredMatch = prelimIngredMatches.map((ingredObj) => {
        return(
            <>
            <tr>
                <td class="recipeingredient" colspan="2">{ingredObj[1]}</td>
                <td class="actions">
                    <button class="edit-item" title="Edit" onClick={printState}>Test</button>
                    <a class="remove-item" title="Remove">Remove</a>
                </td>
            </tr>
            </>
        )
    })

    return(
        <>
        {renderPrelimIngredMatch}
        </>
    )
}

export default IngredMatchCell;

