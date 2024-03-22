import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Col, Row, Form } from "react-bootstrap";

export const UpdateUser = ({ username, password, email, birthday, token, refreshUser }) => {
    const [theusername, setUsername] = useState(username);
    const [thepassword, setPassword] = useState("");
    const [theemail, setEmail] = useState(email);
    const [thebirthday, setBirthday] = useState(`${birthday.slice(0, 10)}`);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: theusername,
            Password: thepassword,
            Email: theemail,
            Birthday: thebirthday,
        };

        fetch(`https://movies-myflix-cmr927-6d25967ba551.herokuapp.com/users/${theusername}`,
            {

                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            }).then((response) => {
                if (response.ok) {
                    alert("Your info was successfully updated");
                    refreshUser();
                } else {
                    alert("Your info failed to update");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            });
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Col md={4}>
                <Form.Group controlId="formUpdateUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={theusername}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="6"
                        placeholder="Username must be at least 6 characters"
                    />
                </Form.Group>

                <Form.Group controlId="formUpdatePassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={thepassword}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="8"
                        placeholder="Password required"
                    />
                </Form.Group>

                <Form.Group controlId="formUpdateEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={theemail}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                    />
                </Form.Group>

                <Form.Group controlId="formUpdateBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        type="date"
                        value={thebirthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </Form.Group>
                <Col className="mt-2">
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Col>
            </Col>
        </Form>
    );
}
