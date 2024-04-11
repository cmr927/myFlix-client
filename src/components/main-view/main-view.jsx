import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { MoviesFilter } from "../movies-filter/movies-filter";
import { Col, Row, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("");
  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  useEffect(() => {
    if (!token || token === null) {
      return;
    }

    fetch("https://movies-myflix-cmr927-6d25967ba551.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map(
          (doc) => {
            doc.Director.Birth = new Date(doc.Director.Birth);
            if (doc.Director.Death) {
              doc.Director.Death = new Date(doc.Director.Death);
            }

            return doc;
          }
        );
        setMovies(moviesFromApi);
      })
  }, [token]);

  const refreshUser = () => {
    if (!token) {
      return;
    }

    fetch(`https://movies-myflix-cmr927-6d25967ba551.herokuapp.com/users/${user.Username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      })
  };

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(filter)
  );

  return (
    <Container>
      <BrowserRouter>
        <NavigationBar
          user={user}
          onLoggedOut={onLoggedOut}
        />

        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token)
                      }
                      } />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/user/:username"
              element={
                <>
                  {user ? (
                    <ProfileView user={user} token={token} onLoggedOut={onLoggedOut} refreshUser={refreshUser} movies={movies} />
                  ) : (
                    <Navigate to="/login" />
                  )}
                </>
              }
            />
            <Route
              path="/movies/:movie_id"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView movies={movies} username={user.Username} token={token} refreshUser={refreshUser} />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path="/"
              element={
                <>

                  <Row>
                    <Col className="mb-3 mt-3" sm={5} md={4}>
                      <MoviesFilter setFilter={setFilter}
                        filter={filter}>
                      </MoviesFilter>
                    </Col>
                  </Row>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : filteredMovies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <>
                      {filteredMovies.map((movie) => (
                        <Col className="mb-4" key={movie._id} md={3} sm={6}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </>
                  )}


                </>
              }
            />
          </Routes>
        </Row>
      </BrowserRouter>
    </Container>
  );
};

// Here is where we define the prop constraints for the MainView
MainView.propTypes = {}