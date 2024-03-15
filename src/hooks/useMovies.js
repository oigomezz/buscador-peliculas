import listOfMovies from '../mockups/movies.json';

export function useMovies(){
    const movies = listOfMovies.Search;
    const mappedMovies = movies?.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        image: movie.Poster,
    }));

    return {movies: mappedMovies}
}