import "./App.css";
import { useMovies } from "./hooks/useMovies";
import { Movies } from "./components/Movies";
import { useSearch } from "./hooks/useSearch";
import { useCallback, useEffect, useState } from "react";
import debounce from "just-debounce-it";

export default function App() {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error: searchError } = useSearch();
  const {
    movies,
    getMovies,
    loading,
    error: moviesError,
  } = useMovies({ search, sort });

  //? No puedo hacer esto porque se crearia un nuevo debounce en cada render
  //? por eso tengo que usar useCallback (que es un useMemo pero para funciones),
  //? para que no recree la funcion en cada render, solo cuando cambia una de sus dependencias
  // const debouncedGetMovies = debounce(({ search }) => {
  //   console.log(`search: ${search}`);
  //   getMovies({ search });
  // }, 500);
  const debouncedGetMovies = useCallback(
    debounce(({ search }) => {
      console.log(`search: ${search}`);
      getMovies({ search });
    }, 500),
    [getMovies]
  );

  const handleSubmit = (event) => {
    console.log(`[App] (handleSubmit) Handleando el submit`);
    event.preventDefault();
    getMovies({ search });
  };

  // Esto va a cambiar el sort entre estados
  const handleSort = () => {
    setSort(!sort);
  };

  // Seteamos search cada vez que cambie el input
  const handleInputChange = (event) => {
    console.log(
      `[App] (handleInputChange) Input ahora es ${event.target.value}`
    );
    const newSearch = event.target.value;
    setSearch(event.target.value);
    // hacemos debounce solo de este getMovies, porque es el que se hace cuando cambia el input
    // si no estuviera, se haria una peticion a la API por cada letra que cambia cuando tipeas
    // una palabra
    debouncedGetMovies({ search: newSearch });
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="movie-input">Put the movie</label>
          <input
            onChange={handleInputChange}
            value={search}
            name="search"
            id="movie-input"
            placeholder="Avengers, Starwars..."
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {searchError && <p className="error-msg">{searchError}</p>}
      </header>
      <main className="main">
        {loading ? <p> Cargando</p> : <Movies movies={movies}></Movies>}
      </main>
    </div>
  );
}
