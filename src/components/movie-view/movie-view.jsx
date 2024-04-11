import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Card, Container, Col, Row } from "react-bootstrap";

const dayjs = require('dayjs');

export const MovieView = ({ movies, username, token, refreshUser }) => {
  const { movie_id } = useParams();

  const movie = movies.find((m) => m._id === movie_id);

  const movieDirectorBirth = dayjs(movie.Director.Birth);

  const movieDirectorDeath = dayjs(movie.Director.Death);


  const onClick = () => fetch(`https://movies-myflix-cmr927-6d25967ba551.herokuapp.com/users/${username}/movies/${movie_id}`, {
    method: "POST",
    body: JSON.stringify(movie),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      alert("Added to your favorites");
      refreshUser();
    } else {
      alert("Failed to add this movie to your favorites");
    }
  })
    .catch((e) => {
      alert("Something went wrong");
    });

  const onRemoveClick = () => fetch(`https://movies-myflix-cmr927-6d25967ba551.herokuapp.com/users/${username}/movies/${movie_id}`, {
    method: "DELETE",
    body: JSON.stringify(movie),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      alert("Removed from your favorites");
      refreshUser();
    } else {
      alert("Failed to remove this movie to your favorites");
    }
  })
    .catch((e) => {
      alert("Something went wrong");
    });

  return (
    <Container>
      <Row>
        <div>
          <Col md={6}>
            {<div>
              <img className="w-100" src={movie.ImagePath} alt={`The poster of ${movie.Title}`} />
            </div>}
          </Col>
          <div>
            <span className="fw-bold">Movie ID: </span>
            <span>{movie._id}</span>
          </div>
          <div>
            <span className="fw-bold">Title: </span>
            <span>{movie.Title}</span>
          </div>
          <div>
            <span className="fw-bold">Year: </span>
            <span>{movie.Year}</span>
          </div>
          <div>
            <span className="fw-bold">Description: </span>
            <span>{movie.Description}</span>
          </div>
          <div>
            <span className="fw-bold">Genre Name: </span>
            <span>{movie.Genre.Name}</span>
          </div>
          <div>
            <span className="fw-bold">Genre Description: </span>
            <span>{movie.Genre.Description}</span>
          </div>
          <div>
            <span className="fw-bold">Director Name: </span>
            <span>{movie.Director.Name}</span>
          </div>
          <div>
            <span className="fw-bold">Director Bio: </span>
            <span>{movie.Director.Bio}</span>
          </div>
          <div>
            <span className="fw-bold">Director Birth: </span>
            <span>{movieDirectorBirth.format('dddd, MMMM DD, YYYY')}</span>
          </div>{movie.Director.Death ?
            <div>
              <span className="fw-bold">Director Death: </span>
              <span>{movieDirectorDeath.format('dddd, MMMM DD, YYYY')}</span>
            </div> : <div> </div>}
          <div>
            <span className="fw-bold">Featured: </span>
            <span>{movie.Featured}</span>
          </div>
          <Col className="mt-2">
            <Link className="m-2" to={`/`}>
              <Button>Back</Button>
            </Link>
            <Button className="m-2" onClick={onClick}>
              Add to favorites
            </Button>
            <Button className="m-2" onClick={onRemoveClick}>
              Remove from favorites
            </Button>
          </Col>
        </div>
      </Row>
    </Container>
  );
};

// Here is where we define all the props constraints for the MovieView
MovieView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.instanceOf(Date).isRequired,
      Death: PropTypes.instanceOf(Date)
    }),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
    Actors: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};