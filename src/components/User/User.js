import React, { useState } from 'react';
import "./User.css"

function User(props) {
    const [user_id, setUser_id] = useState("")

    const handleChange = e => {
        setUser_id(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        setUser_id(user_id);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`http://localhost:5000/${user_id}`, requestOptions)
            .then((res) =>
                //console.log(res),
                res.json().then((data) => {
                    console.log(data);
                    props.setData(data);
                    props.setIsLogged(true);
                })
                .catch(error => {
                    console.error('Error', error);
                })
            );
    }

    return (
        <div className="user_btn">
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text" placeholder="user_id" value={user_id} onChange={handleChange}/>
                    <button type="submit">Login</button>
                </label>
            </form>
        </div>
    );
}

export default User;