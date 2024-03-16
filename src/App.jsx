import "./App.css";
import { useEffect, useRef, useState } from "react";
import { useMovies } from "./hooks/useMovies.js";
import { Movies } from "./components/Movies.jsx";

function useSearch() {
  const [search, setSearch] = useState("");
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

    if (RegExp(/^\d+$/).exec(search)) {
      setError("No se puede buscar una pelicula con un numero");
      return;
    }

    if (search.length < 3) {
      setError("La busqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);
  return { search, setSearch, error };
}

function App() {
  const { search, setSearch, error } = useSearch();
  const { movies, getMovies } = useMovies({ search});

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setSearch(newQuery);
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
