import React from 'react';
import './Styles.scss';

const SearchResultPage = () => {

    return(
        <div className="search-result-container">
            <div className="search-bar-container">
                <form className="search-bar-form">
                    <input className="search-bar-input"
                    type="search"
                    placeholder="Search..."
                    autofocus required
                    />
                    <button className="search-bar-button" type="submit">Go</button>
                </form>
            </div>
          </div>
    )
};

export default SearchResultPage;