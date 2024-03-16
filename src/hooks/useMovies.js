import { useState } from "react";
// import listOfMovies from "../mockups/movies.json";
import noResponse from "../mockups/no-response.json";

export function useMovies({ search }) {
  const [responseMovie, setResponseMovie] = useState([]);
  const movies = responseMovie.Search;

  const mappedMovies = movies?.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    image: movie.Poster,
  }));

  const getMovies = () => {
    if (search) {
      // setResponseMovie(listOfMovies);
      fetch(`https://www.omdbapi.com/?apikey=c997ecfc&s=${search}`).then(
        (res) =>
          res.json().then((json) => {
            setResponseMovie(json);
          })
      );
    } else {
      setResponseMovie(noResponse);
    }
  };

  return { movies: mappedMovies, getMovies };
}
