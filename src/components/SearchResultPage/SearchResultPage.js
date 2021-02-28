import React, { useState } from 'react';
import './Styles.scss';

const SearchResultPage = () => {
    const [tempSearchTerm, setTempSearchTerm] = useState(null)
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
        let temp = 
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
            methods: {
                "content-type": "application/json"
            },
            body: JSON.stringify(params)
        })
        .then (r => r.json())
        .then ((response) => {
            console.log(response)
        })
    }

    //error is coming up

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
          </div>
    )
};

export default SearchResultPage;