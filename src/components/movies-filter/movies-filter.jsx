import React from "react";
import Form from "react-bootstrap/Form";

export const MoviesFilter = ({ setFilter, filter }) => {

    return (
        <Form.Control
            type="text"
            placeholder="Search..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
        />
    );
};