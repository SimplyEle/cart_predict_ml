import React, {useEffect, useState} from 'react';
import "./FoodType.css"
import Toolbar from "../ExtendComponents/Toolbar/Toolbar";

function FoodType(props) {

    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:5000/', requestOptions, {mode: 'cors'}).then((res) => res.json()).then((data) => {
            setCurrentTime(data);
        });
    }, []);

    return (
        <div className="ft_section">
            <Toolbar />
        </div>
    );
}

export default FoodType;