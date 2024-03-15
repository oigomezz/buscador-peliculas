import "./App.css";
import { useEffect, useRef, useState } from "react";
import { useMovies } from "./hooks/useMovies.js";
import { Movies } from "./components/Movies.jsx";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("No se puede buscar una pelicula vacia");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una pelicula con un numero");
      return;
    }

    if (search.length < 3) {
      setError("La busqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);
  return { search, updateSearch, error };
}

function App() {
  const { movies } = useMovies();
  const { search, updateSearch, error } = useSearch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ search });
  };

  const handleChange = (event) => {
    const newQuery = event.target.value;
    updateSearch(newQuery);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent",
            }}
            onChange={handleChange}
            value={search}
            name="search"
            placeholder="Avengers, Star Wars, Matrix..."
          />
          <button type="submit"> Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
