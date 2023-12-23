import React from 'react';
import User from "../User/User";
import "./HorizontalMenu.css"

function HorizontalMenu(props) {
    return (
        <div className="horiz_menu">
            <div className="box elegant">
                <div className="eH3">
                    Singapore rec.
                </div>

            </div>
            <div>
                <User setRandomProduct={props.setRandomProduct} setNewUser={props.setNewUser} data={props.data} setData={props.setData} isLogged={props.isLogged} setIsLogged={props.setIsLogged} setFeaturedData={props.setFeaturedData} isLoading={props.isLoading} setLoading={props.setLoading}/>
            </div>
        </div>
    );
}

export default HorizontalMenu;