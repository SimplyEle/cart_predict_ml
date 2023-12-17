import React, { useState, useEffect } from 'react';
import "./User.css"

function User(props) {

    const { customer_id } = props;

    const [userId, setUserId] = useState("")
    const [data, setData] = useState("");
    const handleChange = e => {
        setUserId(e.target.value);
        console.log(data);
        fetch(`/${userId}`).then((res) =>
            res.json().then((data) => {
                const d = data
                    .map((d) => ({
                        userId: d.userId.toString()
                    }))
                console.log(userId);
                setData(data);
            })
        );
    }

    useEffect(() => {
        fetch(`/${userId}`).then((res) =>
            res.json().then((data) => {
                const d = data
                    .map((d) => ({
                        userId: d.userId.toString()
                    }))
                console.log(userId);
            })
        );
    }, []);

    return (
        <div className="user_btn">
            <form>
                <label>
                    <input type="text" value={userId} onChange={handleChange} />
                </label>
            </form>
        </div>
    );
}

export default User;