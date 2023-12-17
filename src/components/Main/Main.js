import React from 'react';
import FoodType from "../FoodType/FoodType";
import MainBox from "../MainBox/MainBox";
import "./Main.css"

function Main(props) {
    return (
        <div className="main">
            <FoodType />
            <MainBox />
        </div>
    );
}

export default Main;