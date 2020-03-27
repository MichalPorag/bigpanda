import React from 'react';

function Form(props) {
    let user = {
        email: "",
        message: ""
    };

    function handleChange(event) {
        user = {...user, [event.target.name]: event.target.value};
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        };

        fetch("http://localhost:8080/", options)
            .then(response => {
                console.log(response.ok);
                props.onCollectionChange(response.ok);
            })
            .catch(err => console.log(`error: ${err}`));
    }

    return (
        <div id={"input-container"}
             onSubmit={handleSubmit}>
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