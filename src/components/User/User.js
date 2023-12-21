import React, { useState } from 'react';
import "./User.css"

function User(props) {
    const [user_id, setUser_id] = useState("")

    const handleChange = e => {
        setUser_id(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.setLoading(true);
        setUser_id(user_id);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`http://localhost:5000/${user_id}`, requestOptions)
            .then((res) =>
                res.json().then((data) => {
                    console.log(data);
                    props.setNewUser(false);
                    props.setData(data);
                    props.setIsLogged(true);
                    props.setFeaturedData(data);
                    props.setLoading(false);
                })
                .catch(error => {
                    console.log("new user");
                    props.setIsLogged(false);
                    props.setNewUser(true);
                    props.setLoading(false);
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