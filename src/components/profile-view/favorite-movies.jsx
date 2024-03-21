import React from 'react'
import { Link } from "react-router-dom";
import { Col, Row, Figure, Button } from 'react-bootstrap';
import './profile-view.scss';
import { MovieCard } from '../movie-card/movie-card';


export const FavoriteMovies = ({ favoriteMovieList, movies }) => {
    const favMovies = movies.filter(m =>
        favoriteMovieList.includes(m._id))
    const favMoviesCard = favMovies.map(movie => {
        return (
            <Col className="mb-4" key={movie._id} md={3} sm={6}>
                <MovieCard movie={movie} />
            </Col>)
    })
    return (
        <>
            <Row>
                <Col xs={12}>
                    <h2>Favorite Movies</h2>
                </Col>
            </Row>
            <Row>
                {favMoviesCard}
            </Row>
        </>
    );
}