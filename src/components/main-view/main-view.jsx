import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://movies-myflix-cmr927-6d25967ba551.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          doc.Director.Birth = new Date(doc.Director.Birth);
          if (doc.Director.Death) {
            doc.Director.Death = new Date(doc.Director.Death);
          }

          return doc;
        });
        setMovies(moviesFromApi);
      })
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {
        !user ? (
          <Col md={5}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            or
            < SignupView />
          </Col>
        ) : selectedMovie ? (
          <Col md={8}>
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); setSelectedMovie(null); }}>Logout</button>
          </Col>
        ) : movies.length === 0 ? (
          <>
            <Col>The list is empty </Col>
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
            return <div>The list is empty</div>;
          </>
        ) : (
          <>
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
            {movies.map((movie) => (
              <Col className="mb-4" key={movie._id} md={3}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}></MovieCard>
              </Col>
            ))}
          </>)

      };  </Row>)
}
// Here is where we define the prop constraints for the MainView
MainView.propTypes = {}