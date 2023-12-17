import React, { useEffect } from 'react';
import "./MainBox.css"
import PreLoader from "../ExtendComponents/PreLoader/PreLoader";
import {Pagination} from "../ExtendComponents/Pagination/Pagination";


function MainBox(props) {

    useEffect(() => {
        props.setLoading(true);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:5000/', requestOptions, {mode: 'cors'}).then((res) => res.json()).then((data) => {
            props.setData(data);
            props.setLoading(false);
        });
    }, []);

    if (props.isLoading) {
        return (
            <div className="MainBox preloader">
                <PreLoader />
            </div>
        )
    }

    return (
        <div className="MainBox">
            {props.isLogged ? (
                <span id="title_main">
                    <p>We recommend you</p>
                </span>
            ) : (
                <span id="title_main">
                    <p>Top products</p>
                </span>
            )}
            <Pagination pageDataLimit={12} data={props.data.res_list}/>
        </div>
    );
}

export default MainBox;