const API_KEY = "c95f5458";

export const searchMovies = async ({ search }) => {
  if (search === "") return null;
  console.log(`[movies service] (searchMovies) search is ${search}`);

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
    );
    const responseJson = await response.json();
    const movies = responseJson.Search;

    // Este mapeo se hace para no atar nuestra UI a la API
    // Imaginate que el dia de mañana cambiamos de API, y en el fondo de nuestra app,
    // un componente esperaba el objeto con las keys que venian de la API.
    // Bueno, este mapeo está para evitar ese problema
    const mappedMovies = movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster,
    }));

    return mappedMovies;
  } catch (err) {
    throw new Error("Error searching movies");
  }
};
