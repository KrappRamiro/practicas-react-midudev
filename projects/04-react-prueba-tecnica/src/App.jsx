import { useState, useEffect } from "react";
import "./App.css";
import { getNewFact, getCatImageUrl } from "./services/facts";
import { useCatImage } from "./hooks/useCatImage.js";
import { useCatFact } from "./hooks/useCatFact.js";

export function App() {
  const { fact, refreshFact } = useCatFact();
  const { catImageUrl } = useCatImage({ fact });

  return (
    <main className="main">
      <h1 className="title">App de gatitos</h1>
      <button onClick={refreshFact}>Get new fact</button>
      <section className="about-cats">
        {fact && <p data-testid="fact-text">{fact}</p>}
        {catImageUrl && (
          <img
            data-testid="fact-image"
            className="cat-image"
            alt={`Image generated with the fact ${fact}`}
            src={catImageUrl}
          ></img>
        )}
      </section>
    </main>
  );
}
