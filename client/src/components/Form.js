import React, {useState} from 'react';

function Form() {
    let user = {
        email: "",
        message: ""
    };

    function handleChange(event) {
        user = {...user, [event.target.name]: event.target.value};
        console.log(">>>>user: " + JSON.stringify(user));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const options = {
            method: 'POST',
            // headers: {
            //     'Accept': '*/*',
            //     'Content-Type': 'application/json'
            // },
            body: JSON.stringify(user)
        };
        console.log(`options: ${JSON.stringify(options)}`);
        fetch("http://localhost:8080/", options)
            .then(resp => console.log(resp))
            .catch(err => alert(`error: ${err}`));
    }

    return (
        <div  id={"input-container"}>
            <form action={"#"} id={"add-comment-form"}>
                <input name={"email"}
                       type={"text"}
                       onChange={handleChange}
                       placeholder={"Email"}/>
                <input id={"Message"}
                       name={"message"}
                       type={"text"}
                       onChange={handleChange}
                       placeholder={"Message"}/>

                <button id={"submit-button"}
                        onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Form;