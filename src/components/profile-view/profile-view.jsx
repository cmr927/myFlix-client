import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import { Button, Card, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import './profile-view.scss';
import { useParams } from "react-router";
import PropTypes from "prop-types";
import { UpdateUser } from './update-user';
import { DeregisterUser } from './deregister-user';
import { FavoriteMovies } from './favorite-movies';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ user, token, onLoggedOut, refreshUser, movies }) => {
    return (
        <>
            <Container>
                <Row>
                    <Col xs={12} sm={4}>
                        <h1> Welcome, {user.Username}! </h1>
                    </Col>
                    <h2> Update your info </h2>
                    <UpdateUser username={user.Username} password={user.Password} email={user.Email} birthday={user.Birthday} token={token} refreshUser={refreshUser} />

                    <Row>
                        <FavoriteMovies favoriteMovieList={user.FavoriteMovies} movies={movies} >
                        </FavoriteMovies>

                    </Row>
                    <Col md={4}>
                        <DeregisterUser username={user.Username} token={token} onLoggedOut={onLoggedOut} />
                    </Col>

                </Row>
            </Container>
        </>
    );
}
