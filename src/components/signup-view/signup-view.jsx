import React, { useState } from "react";
import { Button, Form, Col, Row, Container } from "react-bootstrap";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
        };

        fetch("https://movies-myflix-cmr927-6d25967ba551.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        })
            .catch((e) => {
                alert("Something went wrong");
            });
    }

    return (
        <Container>
            <Row>
                <h2>Create your myFlix account</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formSingupUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="6"
                            placeholder="Username must be at least 6 characters"
                        />
                    </Form.Group>

                    <Form.Group controlId="formSignupPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="8"
                            placeholder="Password must be at least 8 characters"
                        />
                    </Form.Group>

                    <Form.Group controlId="formSignupEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email"
                        />
                    </Form.Group>

                    <Form.Group controlId="formSignupBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </Form.Group>
                    <Col className="mt-2">
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Form>
            </Row>
        </Container>
    );
};
