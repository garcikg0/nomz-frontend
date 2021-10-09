import React, { useState, useEffect }from 'react';
import './Styles.scss';
import ReactDom from 'react-dom';
import SearchIngredientCard from '../SearchIngredientCard/SearchIngredientCard';


const SearchIngredientModal = ( { open, onClose, ingredientsOfKitchenRendered, kitchenRendered } ) => {

    const [newIngredientData, setNewIngredientData] = useState({
        name: "",
        storage: "",
        icon: "",
        status: "",
        notes: "",
        kitchen_id: ""
    })
    const [resultArrIndex, setResultArrIndex] = useState(null)
    const [ingredArrIndex, setIngredArrIndex] = useState(null)
    const [searchTerm, setSearchTerm] = useState(null)
    const [ingredArr, setIngredArr] = useState([])

    useEffect(() => {
        if (ingredientsOfKitchenRendered){
            setIngredArr(ingredientsOfKitchenRendered)
        }
    }, [])

    if (!open) return null;

    const handleChange = e => {
        const value = e.target.value;
        setSearchTerm(value)

    }

    // const filteredIngredientArr = ingredArr.filter((ingredObj) => {
    //     return ingredObj.name.toLowerCase().includes(searchTerm.toLowerCase())
    // })


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

    let renderIngredients = ingredientsOfKitchenRendered.map((ingredient) => {
        return(
            <SearchIngredientCard 
            key={ingredient.id}
            ingredient={ingredient}
            kitchen_id={kitchenRendered.id}
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
                                placeholder="Search..."
                                autoFocus required
                                onChange={handleChange}
                        />
                        <button className="ingredient-search-bar-button">Go</button>
                    </form>
                </div>
                <div className="search-ingredient-card-deck-container">
                    <div className="search-ingredient-card-deck">
                        {renderIngredients}
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