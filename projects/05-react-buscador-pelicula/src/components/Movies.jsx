import PropTypes from "prop-types";
function ListOfMovies({ movies }) {
  return (
    <ul className="movies-list">
      {movies.map((movie) => (
        <li key={movie.id} className="movie">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-year">{movie.year}</p>
          <img
            className="movie-image"
            src={movie.image}
            alt={`${movie.title} (${movie.year}) poster`}
          />
        </li>
      ))}
    </ul>
  );
}

function NoMoviesResult() {
  return <p>No se encontraron resultados</p>;
}

export function Movies({ movies }) {
  console.log(`[Movies] me pidieron que renderice:`);
  console.log(movies);
  if (!movies) return;
  const hasMovies = movies.length > 0;

  return hasMovies ? (
    <ListOfMovies movies={movies}></ListOfMovies>
  ) : (
    <NoMoviesResult></NoMoviesResult>
  );
}

Movies.propTypes = {
  movies: PropTypes.array,
};
