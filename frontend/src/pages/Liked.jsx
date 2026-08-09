import { useContext } from "react";
import MovieGrid from "../components/movies/MovieGrid";
import useSavedMovies from "../hooks/useSavedMovies";
import { MovieContext } from "../context/MovieContext";

function Liked({ movies }) {
  const resolvedMovies = useSavedMovies(movies);
  const { isBlueTheme } = useContext(MovieContext);

  const filteredMovies = resolvedMovies.filter((movie) =>
    isBlueTheme ? movie.media_type === "movie" : movie.media_type === "tv",
  );

  if (filteredMovies.length === 0) {
    return (
      <div
        className="flex h-40 items-center justify-center text-lg"
        style={{ color: "var(--text-light)" }}
      >
        You haven't liked any {isBlueTheme ? "movies" : "TV shows"} yet.
      </div>
    );
  }

  return <MovieGrid movies={filteredMovies} />;
}

export default Liked;
