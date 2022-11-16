import React, { useEffect, useState } from 'react';
import './Styles.scss';

const AvailabilityStatus = ( {resultCount, ingredMatchCount, setIngredMatchCount} ) => {

    return (
        <>
        <i className="fas fa-check-circle" >
            <h4 className="accordion-status-text">Available</h4>
        </i>        
        </>
    )
}

export default AvailabilityStatus