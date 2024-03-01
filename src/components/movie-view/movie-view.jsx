import PropTypes from "prop-types";

import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      {<div>
        <img className="w-100" src={movie.ImagePath} />
      </div>}
      <div>
        <span>Movie ID: </span>
        <span>{movie._id}</span>
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Year: </span>
        <span>{movie.Year}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre Name: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Genre Description: </span>
        <span>{movie.Genre.Description}</span>
      </div>
      <div>
        <span>Director Name: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Director Bio: </span>
        <span>{movie.Director.Bio}</span>
      </div>
      <div>
        <span>Director Birth: </span>
        <span>{movie.Director.Birth.toUTCString()}</span>
      </div>{movie.Director.Death ?
        <div>
          <span>Director Death: </span>
          <span>{movie.Director.Death.toUTCString()}</span>
        </div> : <div> </div>}
      <div>
        <span>Featured: </span>
        <span>{movie.Featured}</span>
      </div>
      <button className="back-button" onClick={onBackClick}>Back</button>
    </div>
  );
};
// Here is where we define all the props constraints for the MovieView
MovieView.propTypes = {
  movie: PropTypes.shape({
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
  }).isRequired,
  onBackClick: PropTypes.func.isRequired

}