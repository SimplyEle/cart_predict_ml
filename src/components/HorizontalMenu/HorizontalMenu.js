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
                <User data={props.data} setData={props.setData} isLogged={props.isLogged} setIsLogged={props.setIsLogged}/>
            </div>
        </div>
    );
}

export default HorizontalMenu;