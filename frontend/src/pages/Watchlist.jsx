import MovieCard from "../components/cards/MovieCard";
import useSavedMovies from "../hooks/useSavedMovies";

function Watchlist({ movies }) {
  const resolvedMovies = useSavedMovies(movies);

  if (resolvedMovies.length === 0) {
    return (
      <div
        className="flex h-40 items-center justify-center text-lg"
        style={{ color: "var(--text-light)" }}
      >
        Your watchlist is empty.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {resolvedMovies.map((movie) => (
        <MovieCard key={movie._id || movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default Watchlist;
