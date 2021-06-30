import React, { useEffect, useState } from 'react';
import './Styles.scss';

const IngredMatchCell = ( {prelimIngredMatch, ingredMatchClick, ingredBlockClick, ingredBlock} ) => {
    const [prelimIngredMatches, setPrelimIngredMatches] = useState([])

    // convert prelimIngredMatch prop (Map DS) to Array DS allowing render through map iteration
    useEffect(() => {
        if (prelimIngredMatches.length < 1) {
            let arr = Array.from(prelimIngredMatch)
            setPrelimIngredMatches(arr)
        } else if (prelimIngredMatches.length >= 1){
            let arr = Array.from(prelimIngredMatch)
            setPrelimIngredMatches(arr)
        }
    }, [prelimIngredMatch, ingredBlock])
    
    let renderPrelimIngredMatch = prelimIngredMatches.map((ingredObj, i) => {
        return(
            <>
            <tr key={i}>
                <td className="recipeingredient" colSpan="2">{ingredObj[1]}</td>
                <td className="actions">
                    <a className="match-item" title="Match" 
                    onClick={(e) => ingredMatchClick(ingredObj, e)}>
                        <i className="far fa-check-circle"></i>
                    </a>
                    <a className="block-item" title="Block" 
                    onClick={(e) => ingredBlockClick(ingredObj, e)}>
                        <i className="fas fa-ban"></i>
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