import { useRef, useState, useMemo, useCallback } from "react";
import { searchMovies } from "../services/movies";

// custom hook para obtener las movies y mapearlas
export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  //? useCallback es un syntax sugar para no tener que hacer
  //	const getMovies = useMemo(() => {
  //		return async ({ search }) => {
  //			cuerpo de la funcion aqui
  //? Por debajo hace exactamente lo mismo que useMemo
  //? Solo que useCallback esta pensado para las funciones

  // le pasamos el search por parametro, asi logramos que se genere una sola vez la funcion
  // y no cada vez que se re-renderice el componente
  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) {
      console.log("El search no cambio, volviendo!");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // quiero memoizar el calculo de sortedMovies, para no tener que rehacerlo si nada cambio
  const sortedMovies = useMemo(() => {
    console.log("Sorting movies");
    let sortedMovies;
    if (!movies) return [];

    if (sort) {
      sortedMovies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      sortedMovies = [...movies];
    }
    return sortedMovies;
  }, [movies, sort]); // movies y sort son mis dependencias

  return { movies: sortedMovies, getMovies, loading, error };
}
