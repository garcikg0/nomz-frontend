import React, { useState } from 'react';
import SearchResultCard from '../SearchResultCard/SearchResultCard'
import SearchResultPagination from '../SearchResultPagination/SearchResultPagination';
import './Styles.scss';

const SearchResultPage = () => {
    const [searchTerm, setSearchTerm] = useState(null)
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(100)
    const [searchTermKey, setSearchTermKey] = useState(null)
    const [searchResults, setSearchResults] = useState([])
    const [searchResultId, setSearchResultId] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [pagFrom, setPagFrom] = useState(0)

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
        setTo(100)
        let params = {
            search_term_key: searchTermKey,
            from: from,
            to: to,
            user_id: 1,
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
        // console.log(page)
        let tempPagFrom = (page - 1) * 20
        setPagFrom(tempPagFrom)
        let params = {
            id: searchResultId,
            user_id: 1,
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

    let renderResults = searchResults.map((resultObj) => {
        return(
            <SearchResultCard
                key={resultObj.id}
                recipe={resultObj}
            />
            )
        }
    )

    return(
        <div className="search-result-container">
            <div className="search-bar-container">
                <form className="search-bar-form" onSubmit={handleSubmit}>
                    <input className="search-bar-input"
                    type="search"
                    placeholder="Search..."
                    autofocus required
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
    )
};

export default SearchResultPage;