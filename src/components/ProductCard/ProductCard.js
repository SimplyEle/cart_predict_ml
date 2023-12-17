import React, {useState} from 'react';
import "./ProductCard.css"

function ProductCard(props) {

    return (
        <div className="card custom-scrollbar">
            <span id="name_card"> { props.products[2] } </span> <br />
            <span id="unit_price_card"> Price: { props.products[3] } </span>
        </div>
    );
}

export default ProductCard;