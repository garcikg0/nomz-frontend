import React, { useState } from 'react';
import SearchResultCard from '../SearchResultCard/SearchResultCard'
import SearchResultPagination from '../SearchResultPagination/SearchResultPagination';
import KitchenNavbar from '../KitchenNavbar/KitchenNavbar'
import AddIngredientModal from '../AddIngredientModal/AddIngredientModal';
import './Styles.scss';

const SearchResultPage = ( {kitchenRendered, userKitchens, setKitchenRendered, ingredientsOfKitchenRendered, setIngredientsOfKitchenRendered} ) => {
    const [searchTerm, setSearchTerm] = useState(null)
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(100)
    const [searchTermKey, setSearchTermKey] = useState(null)
    const [searchResults, setSearchResults] = useState([])
    const [searchResultId, setSearchResultId] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [pagFrom, setPagFrom] = useState(0)
    const [searchTermUser, setSearchTermUser] = useState(null)

    const [isAddIngredientOpen, setIsAddIngredientOpen] = useState(false);
    const [addIngredientData, setAddIngredientData] = useState(null);

    if (localStorage && !searchTermUser) {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:3000/kitchenuser`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(r => r.json())
        .then( data => {
            setSearchTermUser(data)
        })
    }

    const createSearchTerm = (str) => {
        let removeExtraSpace = str.toLowerCase().trim().split(/ +/).join(' ');
        let removeSpecialChars = removeExtraSpace.replace(/[^a-zA-z ]/g, "")
        let urlSyntax = removeSpecialChars.split(' ').join('+')
        return urlSyntax
    }

    const createSearchTermKey = (str) => {
        let tempSearchTermKey = `${str}&from=${from}&to=${to}`
        setSearchTermKey(tempSearchTermKey)
    }

    const handleChange = e => {
        const value = e.target.value;
        setSearchTerm(createSearchTerm(value))
        createSearchTermKey(searchTerm)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        setSearchResults([])
        setFrom(0)
        setPagFrom(0)
        setTo(100)
        let params = {
            search_term_key: searchTermKey,
            pagFrom: 0,
            from: from,
            to: to,
            user_id: searchTermUser,
            search_term: searchTerm,
            results: []
        }
        fetch(`http://localhost:3000/recipesearch`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
        .then(r => r.json())
        .then(data => {
            setSearchResultId(data.id)
            setSearchResults(data.results)
        })
    }

    const handleMoreResults = page =>{
        let tempPagFrom = (page - 1) * 20
        // if tempPagFrom > 99, then send updated to and from similar to handleSubmit.    
        if (tempPagFrom > 99) {
            setPagFrom(tempPagFrom)
            let params = {
                search_term_key: searchTermKey,
                pagFrom: tempPagFrom,
                from: from + 100,
                to: to + 100,
                user_id: searchTermUser,
                search_term: searchTerm,
                results: []
            }
            fetch(`http://localhost:3000/recipesearch`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
            })
            .then(r => r.json())
            .then(data => {
                setSearchResultId(data.id)
                setSearchResults([])
                setSearchResults(data.results)
            })
        }
        // else continue 
        setPagFrom(tempPagFrom)
        let params = {
            id: searchResultId,
            user_id: searchTermUser,
            pagFrom: tempPagFrom
        }
        fetch(`http://localhost:3000/sendresults`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
        .then(r => r.json())
        .then(data => {
            setSearchResultId(data.id)
            setSearchResults([])
            setSearchResults(data.results)
        })
    }

    const updateBackendIngredMatch = (resultArrIndex, ingredArrIndex, ingredMatchObj) => {
        let params = {
            id: searchResultId,
            user_id: searchTermUser,
            resultArrIndex: resultArrIndex,
            ingredArrIndex: ingredArrIndex,
            ingredMatchObj: ingredMatchObj,
            pagFrom: pagFrom,
            results: searchResults
        }
        fetch(`http://localhost:3000/ingredupdate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
        .then(r => r.json())
        .then(data => {
            setSearchResults(data.results)
        })
    }

    const updateBackendIngredBlock = (resultArrIndex, ingredArrIndex, ingredBlockObj) => {
        let params = {
            id: searchResultId,
            user_id: searchTermUser,
            resultArrIndex: resultArrIndex,
            ingredArrIndex: ingredArrIndex,
            ingredBlockObj: ingredBlockObj,
            pagFrom: pagFrom,
            results: searchResults
        }
        fetch(`http://localhost:3000/ingredupdate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
        .then(r => r.json())
        .then(data => {
            setSearchResults(data.results)
        })
    }

    const undoBackendIngredMatch = (resultArrIndex, ingredArrIndex, ingredMatchObj) => {
        let params = {
            id: searchResultId,
            user_id: searchTermUser,
            resultArrIndex: resultArrIndex,
            ingredArrIndex: ingredArrIndex,
            ingredMatchUndoObj: ingredMatchObj,
            pagFrom: pagFrom,
            results: searchResults
        }
        fetch(`http://localhost:3000/ingredupdate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
        .then(r => r.json())
        .then(data => {
            setSearchResults(data.results)
        })
    }

    // Adding an Ingredient
    const addIngredient = (newIngredient) => {
        let newArr = [...ingredientsOfKitchenRendered, newIngredient]
        setIngredientsOfKitchenRendered(newArr)
    }

    let renderResults = searchResults.map((resultObj, i) => {
        return(
            <SearchResultCard
                key={i}
                resultArrIndex={i}
                recipe={resultObj}
                kitchenIngreds={ingredientsOfKitchenRendered}
                kitchenRenderedId={kitchenRendered.id}
                updateBackendIngredMatch={updateBackendIngredMatch}
                updateBackendIngredBlock={updateBackendIngredBlock}
                undoBackendIngredMatch={undoBackendIngredMatch}
                addIngredient={addIngredient}
                setAddIngredientData={setAddIngredientData}
                setIsAddIngredientOpen={setIsAddIngredientOpen}
            />
            )
        }
    )

    return(
        <>
        <div className="search-result-container">
            <KitchenNavbar 
            userKitchens={userKitchens}
            kitchenRendered={kitchenRendered}
            setKitchenRendered={setKitchenRendered}
            setIngredientsOfKitchenRendered={setIngredientsOfKitchenRendered}
            />
            <div className="search-bar-container">
                <form className="search-bar-form" onSubmit={handleSubmit}>
                    <input className="search-bar-input"
                    type="search"
                    placeholder="Search..."
                    autoFocus required
                    onChange={handleChange}
                    />
                    <button className="search-bar-button">Go</button>
                </form>
            </div>
            <div className="search-result-accordion-container">
                {renderResults}
                <SearchResultPagination 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                handleMoreResults={handleMoreResults}
                />
            </div>
        </div>
        <AddIngredientModal 
        open={isAddIngredientOpen}
        onClose={()=> {setIsAddIngredientOpen(false)}}
        kitchenRendered={kitchenRendered}
        addIngredient={addIngredient}
        ingredData={addIngredientData}
        updateBackendIngredMatch={updateBackendIngredMatch}
        />
        </>
    )
};

export default SearchResultPage;