import React from 'react';
import FoodType from "../FoodType/FoodType";
import MainBox from "../MainBox/MainBox";
import "./Main.css"

function Main(props) {

    return (
        <div className="main">
            <FoodType isLoading={props.isLoading} data={props.data} isLogged={props.isLogged} setData={props.setData} topData={props.topData} featuredData={props.featuredData} newUser={props.newUser}/>
            <MainBox setTopData={props.setTopData} data={props.data} setData={props.setData} isLoading={props.isLoading} setLoading={props.setLoading} isLogged={props.isLogged} newUser={props.newUser} topData={props.topData} featuredData={props.featuredData}/>
        </div>
    );
}

export default Main;