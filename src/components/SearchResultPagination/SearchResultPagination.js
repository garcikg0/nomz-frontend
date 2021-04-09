import React, { useState } from 'react';
import './Styles.scss';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

// Helper method for creating a range of numbers 
// range (1, 5) => [1,2,3,4,5]
const range = (from, to, step = 1) => {
    let i = from;
    const range = [];
    while (i <= to) {
        range.push(i);
        i += step;
    }
    return range;
}

const SearchResultPagination = ({ currentPage, setCurrentPage }) => {
    const [pageNeighbors, setPageNeighbors] = useState(1)
    const [totalPages, setTotalPages] = useState(10)

    const fetchPageNumbers = () => {
        const totalNumbers = (pageNeighbors * 2) + 2;
        const totalBlocks = totalNumbers + 1;

        if (totalPages > totalBlocks) {
            const startPage = Math.max(2, currentPage - pageNeighbors);
            const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors);
            let pages = range(startPage, endPage);

            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = totalNumbers - (pages.length + 1)

            switch (true) {
                case (hasLeftSpill && !hasRightSpill): {
                    const extraPages = range(startPage - spillOffset, startPage - 1);
                    pages = [LEFT_PAGE, ...extraPages, ...pages];
                    break
                }
                case (!hasLeftSpill && hasRightSpill): {
                    const extraPages = range(endPage + 1, endPage + spillOffset);
                    pages = [...pages, ...extraPages, RIGHT_PAGE];
                    break;
                }
                case (hasLeftSpill && hasRightSpill): 
                default: {
                    pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                    break;
                }
            }
            return [1, ...pages, totalPages];
        }
        return range(1, totalPages)
    }

    const pages = fetchPageNumbers()

    const gotoPage = page => {
        let tempCurrentPage = Math.max(0, Math.min(page, totalPages));
        setCurrentPage(tempCurrentPage)
    }

    let handleClick = page => evt => {
        evt.preventDefault();
        gotoPage(page);
    }

    let handleMoveLeft = evt => {
        evt.preventDefault();
        gotoPage(currentPage - (pageNeighbors * 2) - 1);
    }

    let handleMoveRight = evt => {
        evt.preventDefault();
        gotoPage(currentPage + (pageNeighbors * 2) + 1);
    }

    return(
        <nav>
            <ul className="pagination">
                { pages.map((page, index) => {
                    if (page === LEFT_PAGE) return (
                        <li key={index} className="page-item">
                            <a className="page-link" href="#" onClick={handleMoveLeft}>
                                <span>&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>
                    );

                    if (page === RIGHT_PAGE) return (
                        <li key={index} className="page-item">
                            <a className="page-link" href="#" onClick={handleMoveRight}>
                                <span>&raquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>
                    );

                    return (
                        <li key={index} className={`page-item${ currentPage === page ? ' active' : ''}`}>
                            <a className="page-link" href="#" onClick={ handleClick(page)}>{ page }</a>
                        </li>
                    );

                }) }
            </ul>
        </nav>
    )
}

export default SearchResultPagination;