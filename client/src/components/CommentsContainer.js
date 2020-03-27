import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';

function CommentsContainer(props) {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

    let usersLastActivObj = {};

    console.log(`searchResults: ${typeof (searchResults)} ( ${JSON.stringify(searchResults)} )`);

    async function fetchData() {
        fetch("http://localhost:8080/")
            .then(res => res.json())
            .then(res => setUsers(res))
            .then(res => console.log(">>>>>>>>res: " + res + ", " + "users: " + users))
            .catch(err => console.log(err))
    }

    if (props.isCollectionChange) {
        fetchData();
    }

    useEffect(() => {
        fetchData();

        filterUsers();
    }, [users.length]);

    function createUsersLastActivObj() {

    }

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    React.useEffect(() => {
        filterUsers();
    }, [searchTerm]);

    function filterUsers() {
        if (searchTerm !== "") {
            let filteredUsers = users.filter(user =>
                user.email !== undefined &&
                user.email !== "" &&
                user.email.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
            );
            setSearchResults(filteredUsers);
        } else {
            setSearchResults(users);
        }
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