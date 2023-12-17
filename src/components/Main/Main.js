import React, {useState} from 'react';
import FoodType from "../FoodType/FoodType";
import MainBox from "../MainBox/MainBox";
import "./Main.css"

function Main(props) {
    const [isLoading, setLoading] = useState(true);

    return (
        <div className="main">
            <FoodType isLoading={isLoading} />
            <MainBox data={props.data} setData={props.setData} isLoading={isLoading} setLoading={setLoading} isLogged={props.isLogged}/>
        </div>
    );
}

export default Main;