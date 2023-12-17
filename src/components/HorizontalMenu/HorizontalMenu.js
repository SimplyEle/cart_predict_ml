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
                <User customer_id={"dw321"} />
            </div>
        </div>
    );
}

export default HorizontalMenu;