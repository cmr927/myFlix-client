import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export const DeregisterUser = ({ username, token, onLoggedOut }) => {
    const [theusername, setUsername] = useState(username);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: theusername
        };

        fetch(`https://movies-myflix-cmr927-6d25967ba551.herokuapp.com/users/${theusername}`,
            {

                method: "DELETE",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            }).then((response) => {
                if (response.ok) {
                    alert("Your account is now deleted from myFlix");
                    onLoggedOut()
                    window.location.reload();
                } else {
                    alert("Your account failed to delete");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            });
    }
    return (
        <Link onClick={handleSubmit}>
            Permanently delete your account
        </Link>
    );
}
