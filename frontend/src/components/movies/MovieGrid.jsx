import MovieCard from "../cards/MovieCard";

function MovieGrid({ movies, onEdit }) {
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
    <div className="no-scrollbar flex gap-3 overflow-x-auto overflow-y-hidden py-2">
      {movies.map((movie, index) => (
        <div key={movie._id || movie.id || index} className="shrink-0">
          <MovieCard movie={movie} onEdit={onEdit} />
        </div>
      ))}
    </div>
  );
}

export default MovieGrid;
