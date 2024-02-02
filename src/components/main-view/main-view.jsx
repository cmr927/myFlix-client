import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => { 
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: "Groundhog Day",
      Image:
        "	https://m.media-amazon.com/images/I/81DMQkoVSdL._AC_UF894,1000_QL80_.jpg",
      Description: "A narcissistic, self-centered weatherman finds himself in a time loop on Groundhog Day.",
      Genre: "Fantasy",
      Director: "Harold Ramis",
    },
    {
        id: 2,
        Title: "Edge of Tomorrow",
        Image:
          "https://m.media-amazon.com/images/I/51UMvvHCKQL._AC_UF894,1000_QL80_.jpg",
        Description: "A soldier fighting aliens gets to relive the same day over and over again, the day restarting every time he dies.",
        Genre: "Sci-Fi",
        Director: "Doug Liman",
    },
    {
        id: 3,
        Title: "50 First Dates",
        Image:
          "https://m.media-amazon.com/images/I/51DwXrrfv+L._AC_UF894,1000_QL80_.jpg",
        Description: "Henry Roth is a man afraid of commitment until he meets the beautiful Lucy. They hit it off and Henry think he's finally found the girl of his dreams until discovering she has short-term memory loss and forgets him the next day.",
        Genre: "Romance",
        Director: "Peter Segal",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }



  if (movies.length === 0) {
    return <div>The list is empty</div>;
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
