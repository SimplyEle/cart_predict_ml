import React, { useState, useEffect } from "react";
import ProductCard from "../../ProductCard/ProductCard";
import './Pagination.css'

const Pagination = ({ pageDataLimit, data, color, isPersonal }) => {
    const [currPageNo, setCurrPageNo] = useState(1);
    const [currPagePosts, setCurrPagePosts] = useState([]);
    const [pageNumberGroup, setPageNumberGroup] = useState([]);

    useEffect(() => {
        setCurrPagePosts(getPageData());
        setPageNumberGroup(getPageNumberGroup());
    }, [data, currPageNo]);

    const nextPage = () => setCurrPageNo((prev) => prev + 1);
    const previousPage = () => setCurrPageNo((prev) => prev - 1);
    const changePageTo = (pageNumber) => setCurrPageNo(pageNumber);
    const getPageData = () => {
        const startIndex = currPageNo * pageDataLimit - pageDataLimit;
        const endIndex = startIndex + pageDataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPageNumberGroup = () => {
        let start = Math.floor((currPageNo - 1) / 3) * 3;
        return new Array(4).fill(" ").map((_, index) => start + index + 1);
    };

    return (
        <div className="box">
            <div className="pagination_list">
                {currPagePosts.map(
                    (product, i) =>
                        <ProductCard key={i} products={product} color={color} isPersonal={isPersonal}/>
                )}
            </div>
            <div className="page_nums">
                <div className="page-num-container">
                    <button
                        className={`page-change-btn ${currPageNo === 1 ? "disabled" : ""}  `}
                        disabled={currPageNo === 1}
                        onClick={previousPage}
                    >
                        Previous
                    </button>
                    <ul className="page-num-container list-style-none">
                        {pageNumberGroup.map((value, index) => {
                            return (
                                <li
                                    className={`page-number ${
                                        currPageNo === value ? "active" : ""
                                    } `}
                                    key={index}
                                    onClick={() => changePageTo(value)}
                                >
                                    {value}
                                </li>
                            );
                        })}
                    </ul>
                    <button
                        disabled={currPageNo === Math.floor(data.length / pageDataLimit)+1}
                        className={`page-change-btn ${
                            currPageNo === Math.floor(data.length / pageDataLimit)+1
                                ? "disabled"
                                : ""
                        }  `}
                        onClick={nextPage}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export { Pagination };