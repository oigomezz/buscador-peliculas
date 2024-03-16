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
      setError("No se puede buscar una película vacía");
      return;
    }

    if (RegExp(/^\d+$/).exec(search)) {
      setError("No se puede buscar una película con un número");
      return;
    }

    if (search.length < 3) {
      setError("La búsqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);

  return { search, setSearch, error };
}

function App() {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleSort = () => {
    setSort(!sort)
  }

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
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type="submit"> Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
