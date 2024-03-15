import "./App.css";
import listOfMovies from './mockups/movies.json';
import { Movies } from './components/Movies.jsx';

function App() {
  const movies = listOfMovies.Search

  return (
    <div className="page">
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className="form">
          <input placeholder="Avengers, Star Wars, Matrix..." />
          <button type="submit"> Buscar</button>
        </form>
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
