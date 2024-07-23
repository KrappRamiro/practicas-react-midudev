import { useEffect, useRef, useState } from "react";

export function useSearch() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  // Este efecto se ejecuta cada vez que cambia el search, y setea error en caso de que haya algo invalido
  useEffect(() => {
    //Aca usamos el ref `isFirstInput` para solamente empezar a setear el error "película vacía" una vez que search sea distinto de un ""
    console.log(`[usesearch]: Search: ${search}`);
    if (isFirstInput.current) {
      isFirstInput.current = search === ""; // true o false dependiendo de si search esta vacio o no
      return;
    }
    if (search === "") {
      setError("No se puede buscar una pelicula vacia");
      return;
    }
    if (search.match(/^\d+$/)) {
      // Si todo lo que hay es un decimal
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
