import React, {useEffect, useState} from 'react';
import "./MainBox.css"
import PreLoader from "../ExtendComponents/PreLoader/PreLoader";
import {Pagination} from "../ExtendComponents/Pagination/Pagination";
import Toolbar from "../ExtendComponents/Toolbar/Toolbar";


function MainBox(props) {

    const [dataTopLast, setDataTopLast] = useState("");

    useEffect(() => {
        props.setLoading(true);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:5000/', requestOptions, {mode: 'cors'}).then((res) => res.json()).then((data) => {
            props.setData(data);
            props.setTopData(data);
            props.setLoading(false);
        });
        fetch('http://localhost:5000/top_n_days', requestOptions, {mode: 'cors'}).then((res) => res.json()).then((data) => {
            setDataTopLast(data);
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
                <>
                    <span id="title_main">
                        <p>We recommend you</p>
                    </span>
                    <Pagination pageDataLimit={12} data={props.data.res_list} color={"standard_scheme"} isPersonal={true}/>
                </>
            ) : (
                <>
                    {
                        props.newUser ? (
                            <>
                                <span id="title_main">
                                    <p>Top products last 10 days</p>
                                </span>
                                <Toolbar data={dataTopLast} setData={setDataTopLast} topData={props.topData} featuredData={props.featuredData} isLogged={props.isLogged}/>
                                <Pagination pageDataLimit={4} data={dataTopLast.res_list} color={"red_scheme"} isPersonal={false}/>
                                <span id="title_main">
                                    <p>Top products</p>
                                </span>
                                <Toolbar data={props.data} setData={props.setData} topData={props.topData} featuredData={props.featuredData} isLogged={props.isLogged}/>
                                <Pagination pageDataLimit={4} data={props.data.res_list} color={"standard_scheme"} isPersonal={false}/>
                            </>
                        ) : (
                            <>
                                <span id="title_main">
                                    <p>Top products</p>
                                </span>
                                <Pagination pageDataLimit={12} data={props.data.res_list} color={"standard_scheme"} isPersonal={false}/>
                            </>
                        )
                    }
                </>
            )}
        </div>
    );
}

export default MainBox;