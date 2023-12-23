import React, {useEffect, useState} from 'react';
import "./FoodType.css"
import Toolbar from "../ExtendComponents/Toolbar/Toolbar";
import RandomProduct from "../ExtendComponents/RandomProduct/RandomProduct";

function FoodType(props) {

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:5000/get_random', requestOptions, {mode: 'cors'}).then((res) => res.json()).then((data) => {
            props.setRandomProduct(data.rand_pr[0]);
        });
    }, []);

    return (
        <div className="ft_section">
            <div className="inner_ft_sec">
                {props.newUser ? (<div style={{height: "100px"}}></div>) : (<Toolbar data={props.data} setData={props.setData} topData={props.topData} featuredData={props.featuredData} isLogged={props.isLogged}/>)}
                <RandomProduct data={props.randomProduct} isLoading={props.isLoading}/>
            </div>
        </div>
    );
}

export default FoodType;