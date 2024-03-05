import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movies-myflix-cmr927-6d25967ba551.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
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
            <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); setSelectedMovie(null); }}>Logout</Button>
          </Col>
        ) : movies.length === 0 ? (
          <>
            <Col>The list is empty </Col>
            <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
            return <div>The list is empty</div>
          </>
        ) : (
          <>
            <div className="d-flex flex-row-reverse">
              <Button className="p-2" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
            </div>
            {movies.map((movie) => (
              <Col className="mb-4" key={movie._id} md={3}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie)
                  }}></MovieCard>
              </Col>
            ))}
          </>)

      }  </Row>)
}
// Here is where we define the prop constraints for the MainView
MainView.propTypes = {}