import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import PropTypes from "prop-types";

export const MovieView = ({ movies }) => {
  const { movie_id } = useParams();

  const movie = movies.find((m) => m._id === movie_id);

  return (
    <div>
      {<div>
        <img className="w-100" src={movie.ImagePath} />
      </div>}
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
        <span>{movie.Director.Birth.toUTCString()}</span>
      </div>{movie.Director.Death ?
        <div>
          <span className="fw-bold">Director Death: </span>
          <span>{movie.Director.Death.toUTCString()}</span>
        </div> : <div> </div>}
      <div>
        <span className="fw-bold">Featured: </span>
        <span>{movie.Featured}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
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