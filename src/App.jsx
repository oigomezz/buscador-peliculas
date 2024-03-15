import "./App.css";

function App() {
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
        <h1>Resultados</h1>
      </main>
    </div>
  );
}

export default App;
