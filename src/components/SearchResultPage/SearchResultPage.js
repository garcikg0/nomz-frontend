import React, { useState } from 'react';
import SearchResultCard from '../SearchResultCard/SearchResultCard'
import './Styles.scss';

const SearchResultPage = () => {
    const [searchTerm, setSearchTerm] = useState(null)
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(100)
    const [searchTermKey, setSearchTermKey] = useState(null)

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
        .then((response) => {
            let res = response
            // debugger
            console.log(res)
        })
    }

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
                <SearchResultCard />
                <SearchResultCard />
                <div class="pagination">
                    <a href="#">&laquo;</a>
                    <a class="active" href="#">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">4</a>
                    <a href="#">5</a>
                    <a href="#">&raquo;</a>
                </div>
                
            </div>
        </div>
    )
};

export default SearchResultPage;