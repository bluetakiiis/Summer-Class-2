import MovieCard from "../cards/MovieCard";

function MovieGrid({ movies }) {
  if (!movies || !movies.length) {
    return (
      <div
        className="flex h-40 items-center justify-center text-lg"
        style={{ color: "var(--text-light)" }}
      >
        No movies found.
      </div>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto overflow-y-hidden py-2 no-scrollbar">
      {movies.map((movie, index) => (
        <div key={movie._id || movie.id || index} className="shrink-0">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}

export default MovieGrid;
