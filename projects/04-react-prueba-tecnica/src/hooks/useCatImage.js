import { useState, useEffect } from "react";
import { getCatImageUrl } from "../services/facts";
// Devuelve el catImageUrl con la imagen del gato
export function useCatImage({ fact }) {
  const [catImageUrl, setCatImageUrl] = useState();

  useEffect(() => {
    if (!fact) return;
    getCatImageUrl(fact).then((catImageUrl) => setCatImageUrl(catImageUrl));
  }, [fact]);

  return { catImageUrl };
}
