import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';

function CommentsContainer() {
    const [hasError, setErrors] = useState(false);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

    async function fetchData() {
        fetch("http://localhost:8080/")
            .then(res => res.json())
            .then(res => setUsers(res))
            .catch(err => setErrors(err))
    }

    useEffect(() => {
        fetchData();
        filterUsers();
    }, [users.length]);

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    React.useEffect(() => {
        filterUsers()
    }, [searchTerm]);

    function filterUsers() {
        const filteredUsers = users.filter(user =>
            user.email.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
        );
        setSearchResults(filteredUsers);
    }

    return (
        <div id={"comments-container"}>
            <form action={"#"}>
                <input className={"search-icon"}/>
                <input type={"text"} placeholder={"Filter"}
                       onChange={handleChange}/>
            </form>
            <ul>
                {searchResults.map((user, i) => (
                    <UserCard email={user.email}
                              message={user.message}
                              key={i}/>
                ))}
            </ul>
        </div>
    );
}

export default CommentsContainer;