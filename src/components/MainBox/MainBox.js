import React, { useState, useEffect } from 'react';
import ProductCard from "../ProductCard/ProductCard";
import { csv } from "d3-fetch";
import products_sg from "../../data/products_sg.csv";
import "./MainBox.css"
import PreLoader from "../ExtendComponents/PreLoader/PreLoader";
import {Pagination} from "../ExtendComponents/Pagination/Pagination";


function MainBox(props) {

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:5000/', requestOptions, {mode: 'cors'}).then((res) => res.json()).then((data) => {
            setData(data);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <div className="MainBox preloader">
                <PreLoader />
            </div>
        )
    }

    return (
        <div className="MainBox">
            <Pagination pageDataLimit={20} data={data.res_list}/>
        </div>
    );
}

export default MainBox;