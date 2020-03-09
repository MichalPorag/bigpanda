import React from 'react';
import Gravatar from 'react-gravatar';

const UserCard = (props) => {
    return (
        <li className={"user-card"}>
            <Gravatar email="props.email"
                      size={43}
                      style={{marginTop: "22px"}}/>
            <h6>{props.email}</h6>
            <p>{props.message}</p>
        </li>
    );
};

export default UserCard;