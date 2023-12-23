import React from 'react';
import "./ProductCard.css"

function ProductCard(props) {
    /*score*/
    return (
        <div className={`card custom-scrollbar`}>
            <span id={`name_back`} className={props.color}>
                <span id="name_card">
                    { props.products[2] }
                </span>
            </span> <br />
            <span id="unit_price_card">
                <span> Price: </span>
                <span id={`price_span`} className={props.color}>
                    <span id="price_num">
                        { props.products[3] }
                    </span>
                </span>
            </span>
        </div>
    );
}

export default ProductCard;