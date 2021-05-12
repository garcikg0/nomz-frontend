import React, { useEffect, useState } from 'react';
import './Styles.scss';

const IngredMatchCell = ( {prelimIngredMatch} ) => {
    const [prelimIngredMatches, setPrelimIngredMatches] = useState(prelimIngredMatch)

    const printState = e => {
        e.preventDefault()
        // debugger
        console.log(prelimIngredMatches)
      }
    
    // let renderPrelimIngredMatch = prelimIngredMatches.map((ingredObj) => {
    //     return(
    //         <>
    //         <td class="recipeingredient" colspan="2">{ingredObj}</td>
    //         <td class="actions">
    //             <button class="edit-item" title="Edit" onClick={printState}>Test</button>
    //             <a class="remove-item" title="Remove">Remove</a>
    //         </td>
    //         </>
    //     )
    // })

    return(
        // {renderPrelimIngredMatch}
        <>
        <tr>
        <td class="kitcheningredient" colspan="2" rowspan="1">A Match is Found in Your Kitchen</td>
                <td class="actions">
                    <button class="edit-item" title="Edit" onClick={printState}>Test</button>
                    <a class="remove-item" title="Remove">Remove</a>
                </td>
        </tr>
        <tr>
        <td class="kitcheningredient" colspan="2" rowspan="1">A Match is Found in Your Kitchen</td>
                <td class="actions">
                    <button class="edit-item" title="Edit" onClick={printState}>Test</button>
                    <a class="remove-item" title="Remove">Remove</a>
                </td>
            </tr> 
            <tr>
        <td class="kitcheningredient" colspan="2" rowspan="1">A Match is Found in Your Kitchen</td>
                <td class="actions">
                    <button class="edit-item" title="Edit" onClick={printState}>Test</button>
                    <a class="remove-item" title="Remove">Remove</a>
                </td>
            </tr>            
        </>
    )
}

export default IngredMatchCell;