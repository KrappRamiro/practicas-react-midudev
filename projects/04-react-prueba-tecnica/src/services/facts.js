// TODO: Moverlo a un archivo de constantes o a .env
const CAT_FACT_URL = "https://catfact.ninja/fact";
const CAT_IMAGE_BASE_URL = "https://cataas.com/cat/says";
export const getNewFact = async () => {
  try {
    const res = await fetch(CAT_FACT_URL);
    if (!res.ok) {
      throw new Error("No se pudo recuperar la cita");
    }
    const data = await res.json();
    const { fact } = data;
    return fact;
  } catch (err) {
    return "Hubo un error en la peticion";
  }
};

export const getCatImageUrl = async (fact) => {
  const firstWord = fact.split(" ", 3).join(" "); // get the first three words of the fact
  // get the first three words: fact.split(" ").slice(0, 3).join(" ")
  // get the first three words: fact.split(" ", 3).join(" ")
  const res = await fetch(`${CAT_IMAGE_BASE_URL}/${firstWord}`);
  return res.url;
};
