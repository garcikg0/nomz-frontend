import React, { useState, useEffect }from 'react';
import './Styles.scss';
import ReactDom from 'react-dom';
import SearchIngredientCard from '../SearchIngredientCard/SearchIngredientCard';


const SearchIngredientModal = ( { open, onClose, ingredientsOfKitchenRendered, kitchenRendered, updateBackendIngredMatch, searchIngredData } ) => {

    const [selectedIngredObj, setSelectedIngredObj] = useState(null)
    const [resultArrIndex, setResultArrIndex] = useState(null)
    const [ingredArrIndex, setIngredArrIndex] = useState(null)
    const [searchTerm, setSearchTerm] = useState(null)
    const [ingredArr, setIngredArr] = useState([])

    useEffect(() => {
        if (searchTerm){
            setIngredArr(filteredIngredientArr)
        } else {
            setIngredArr([])
        }
    }, [searchTerm])

    useEffect(() => {
        // update resultArrIndex & ingredArrIndex as it changes in SearchResultPage parent component 
        if (open){
            setResultArrIndex(searchIngredData.resultArrIndex)
            setIngredArrIndex(searchIngredData.ingredArrIndex)
        }
    }, [searchIngredData])

    if (!open) return null;

    const handleChange = e => {
        const value = e.target.value;
        setSearchTerm(value)
    }

    const handleSearchIngredCardClick = (ingredObj, e) => {
        e.preventDefault()
        console.log(resultArrIndex)
        console.log(ingredArrIndex)
        console.log(ingredObj)
        console.log(ingredObj.id)
        updateBackendIngredMatch(ingredObj, e)
    }

    let renderIngredients = ingredientsOfKitchenRendered.map((ingredient) => {
        return(
            <SearchIngredientCard 
            key={ingredient.id}
            ingredient={ingredient}
            kitchen_id={kitchenRendered.id}
            handleSearchIngredCardClick={handleSearchIngredCardClick}
            />
        )
    })

    let filteredIngredientArr = ingredientsOfKitchenRendered.filter((ingredObj) => {
        if(searchTerm){
            return ingredObj.name.toLowerCase().includes(searchTerm.toLowerCase())
        }
    })

    let renderFilteredIngredients = ingredArr.map((ingredient) => {
        return(
            <SearchIngredientCard
            key={ingredient.id}
            ingredient={ingredient}
            kitchen_id={kitchenRendered.id}
            handleSearchIngredCardClick={handleSearchIngredCardClick}
            />
        )
    })

    return ReactDom.createPortal(
        <>
        <div className="search-ingredient-modal-overlay">
            <div className="search-ingredient-modal">
                <div className="ingredient-search-bar-container">
                    <form className="ingredient-search-bar-form" >
                        <input className="ingredient-search-bar-input"
                                type="search"
                                placeholder="Type to Search or Browse Below..."
                                autoFocus required
                                onChange={handleChange}
                        />
                        <button className="ingredient-search-bar-button">Go</button>
                    </form>
                </div>
                <div className="search-ingredient-card-deck-container">
                    <div className="search-ingredient-card-deck">
                        {ingredArr.length > 0 ? renderFilteredIngredients : renderIngredients}
                    </div>
                </div>
                <button className="close-button" onClick={onClose}>Close</button>
            </div> 
        </div>
        </>,
        document.getElementById('portal')
    )
};

export default SearchIngredientModal;







    // const handleSubmit = (evt) => {
    //     evt.preventDefault()
    //     let newIngredientToBackend = newIngredientData
    //     fetch(`http://localhost:3000/ingredients`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(newIngredientToBackend)
    //     })
    //     .then(r => r.json())
    //     .then(newIngredient => {
    //         let ingredMatchObj = newIngredient
    //         addIngredient(newIngredient)
    //         updateBackendIngredMatch(resultArrIndex, ingredArrIndex, ingredMatchObj)
    //     })
    //     onClose()
    // }

    // const handleChange = e => {
    //     const value = e.target.value;
    //     const name = e.target.name;

    //     setNewIngredientData({
    //         ...newIngredientData,
    //         [name]: value,
    //         kitchen_id: kitchenRendered.id
    //     })
    // };
