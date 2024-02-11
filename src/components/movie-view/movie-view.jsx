export const MovieView = ({ movie, onBackClick }) => {
  console.log(movie)
    return (
      <div>
        { <div>
          <img src={movie.ImagePath} />
        </div> }
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
          <span>{movie.Director.Birth}</span>
        </div>{movie.Director.Death?
           <div>
          <span>Director Death: </span>
          <span>{movie.Director.Death}</span>
        </div> : <div> </div> }
        <div>
          <span>Featured: </span>
          <span>{movie.Featured}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };