import React from 'react';

import styles from './Pagination.module.scss';

const Pagination = ({ resultsPerPage, totalResults, paginate, currentPage, setCurrentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
        pageNumbers.push(i);
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < pageNumbers.length) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    return (
        <div className={styles.pagination}>
            {totalResults <= resultsPerPage ? (
                ''
            ) : (
                <div className={styles.paginationInfo}>
                    <button className={styles.paginationClick} onClick={prevPage}>
                        ←
                    </button>
                    <div>
                        <ul className={styles.paginationItems}>
                            {pageNumbers.map((number) => (
                                <li key={number}>
                                    <a
                                        href="#!"
                                        className={currentPage === number ? `${styles.active}` : ''}
                                        onClick={() => paginate(number)}>
                                        {number}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button className={styles.paginationClick} onClick={nextPage}>
                        →
                    </button>
                </div>
            )}
        </div>
    );
};

export default Pagination;
