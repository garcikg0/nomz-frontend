import React, { useEffect, useState } from 'react';
import './Styles.scss';

const IngredMatchCell = ( {prelimIngredMatch, ingredMatchClick, ingredBlockClick} ) => {
    const [prelimIngredMatches, setPrelimIngredMatches] = useState([])

    useEffect(() => {
        if(prelimIngredMatches.length < 1){
            let arr = Array.from(prelimIngredMatch)
            // debugger
            setPrelimIngredMatches(arr)
        }
    }, [prelimIngredMatches])
    
    let renderPrelimIngredMatch = prelimIngredMatches.map((ingredObj) => {
        return(
            <>
            <tr>
                <td class="recipeingredient" colspan="2">{ingredObj[1]}</td>
                <td class="actions">
                    <a class="match-item" title="Match" 
                    onClick={(e) => ingredMatchClick(ingredObj, e)}>
                        <i class="far fa-check-circle"></i>
                    </a>
                    <a class="block-item" title="Block" onClick={ingredBlockClick}>
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