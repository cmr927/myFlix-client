import React, { useState } from "react";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        const data = {
            username: username,
            password: password,
        };

        fetch("https://movies-myflix-cmr927-6d25967ba551.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            });
    }

    return (
        <>
            <Container>
                <Row>
                    <h2>Welcome to myFlix</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                minLength="6"
                                placeholder="Username"
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength="8"
                                placeholder="Password"
                            />
                        </Form.Group>

                        <Col className="mt-2">
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Col>
                        <Link as={Link} to="/signup">
                            Don't have an account?
                        </Link>

                    </Form>
                </Row>
            </Container>
        </>
    );
};
