import React from 'react';
import './RandomProduct.css'
import PreLoader from "../PreLoader/PreLoader";

function RandomProduct(props) {

    if (props.isLoading) {
        return (
            <div className="preloader">
                <PreLoader />
            </div>
        )
    }

    return (
        <div className="random_pr">
            <span id="up_title">
                <span id="title"> <b> RANDOM CHOICE! </b></span>
            </span>
            <span id="name_card_random"> { props.data[2] } </span> <br />
            <span id="price_bottom_random">
                <span id="unit_price_card_random"> Price: <span id="price_value_random"> { props.data[3] } </span> </span>
            </span>
        </div>
    );
}

export default RandomProduct;