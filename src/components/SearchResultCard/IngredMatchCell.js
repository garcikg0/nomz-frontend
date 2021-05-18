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
                    <a class="match-item" title="Match" onClick={printState}>
                        <i class="far fa-check-circle"></i>
                    </a>
                    <a class="block-item" title="Block">
                        <i class="fas fa-ban"></i>
                    </a>
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

