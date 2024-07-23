import { useState, useEffect } from "react";
import { getNewFact } from "../services/facts";
export const useCatFact = () => {
  const [fact, setFact] = useState();

  const refreshFact = () => {
    getNewFact().then((newFact) => setFact(newFact));
  };

  useEffect(refreshFact, []);

  return { fact, refreshFact };
};
