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
    let fileName = products_sg;

    // useEffect(() => {
    //     setLoading(true);
    //
    //     csv(fileName)
    //         .then((text) => {
    //             const words = text
    //                 .map((d) => ({
    //                     vendor_id: d.vendor_id.toString(),
    //                     product_id: d.product_id.toString(),
    //                     name: d.name.toString(),
    //                     unit_price: parseFloat(d.unit_price.toString()).toFixed(6)
    //                 }))
    //                 .slice(0, 150);
    //             setData(words);
    //             setLoading(false);
    //         })
    //         .catch((error) => console.log(error));
    // }, [fileName]);

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
            {/*{data.map(*/}
            {/*    (product, i) =>*/}
            {/*        <ProductCard key={i} products={product}/>*/}
            {/*)}*/}
        </div>
    );
}

export default MainBox;