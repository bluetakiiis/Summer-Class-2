import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { FiHeart, FiCheck, FiPlus } from "react-icons/fi";
import { MdEdit } from "react-icons/md";

import { MovieContext } from "../../context/MovieContext";
import { AuthContext } from "../../context/AuthContext";

function MovieCard({ movie, progress, onEdit }) {
  const { handleToggleLike, handleToggleWatchlist, handleToggleWatched } =
    useContext(MovieContext);
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isAdminView =
    user?.role === "admin" ||
    user?.isAdmin ||
    location.pathname.startsWith("/admin");

  const tmdbBaseUrl =
    import.meta.env.VITE_TMDB_IMAGE_URL || "https://image.tmdb.org/t/p/w500";

  const posterImage =
    movie.posterURL ||
    movie.image ||
    (movie.poster_path ? `${tmdbBaseUrl}${movie.poster_path}` : null) ||
    null;

  // Safely parse and format rating to 1 decimal place
  const rawRating = movie.voteAverage ?? movie.vote_average ?? movie.rating;
  const parsedRating = parseFloat(rawRating);
  const rating = !isNaN(parsedRating) ? parsedRating.toFixed(1) : "N/A";

  // Helper to determine whether the media is a movie or tv show
  const mediaType =
    movie.media_type ||
    (movie.first_air_date || movie.number_of_episodes ? "tv" : "movie");

  const checkInList = (list) => {
    if (!list || !Array.isArray(list)) return false;

    const currentTmdbId = movie.id || movie.tmdbId;
    const currentLocalId = movie._id;

    return list.some((item) => {
      if (!item) return false;

      // Handle local movie checks
      if (item.source === "local" || (item.movieId && !item.tmdbId)) {
        if (!currentLocalId) return false;
        const targetId =
          typeof item.movieId === "object" ? item.movieId?._id : item.movieId;
        return Boolean(targetId && String(targetId) === String(currentLocalId));
      }

      // Handle TMDB movie checks
      if (item.source === "tmdb" || item.tmdbId) {
        if (!currentTmdbId) return false;
        const targetTmdbId =
          item.tmdbId ||
          (typeof item.movieId !== "object" ? item.movieId : null);
        return Boolean(
          targetTmdbId && String(targetTmdbId) === String(currentTmdbId),
        );
      }

      return false;
    });
  };

  const isLiked = checkInList(user?.liked);
  const isWatchlist = checkInList(user?.watchlist);
  const isWatched = checkInList(user?.watched);

  const onLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isTMDB = !movie._id || String(movie._id).startsWith("tmdb-");

    if (isTMDB) {
      handleToggleLike({
        source: "tmdb",
        tmdbId: movie.id || movie.tmdbId,
        mediaType,
      });
    } else {
      handleToggleLike({
        source: "local",
        movieId: movie._id,
      });
    }
  };

  const onWatchlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isTMDB = !movie._id || String(movie._id).startsWith("tmdb-");

    if (isTMDB) {
      handleToggleWatchlist({
        source: "tmdb",
        tmdbId: movie.id || movie.tmdbId,
        mediaType,
      });
    } else {
      handleToggleWatchlist({
        source: "local",
        movieId: movie._id,
      });
    }
  };

  const onWatchedClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isTMDB = !movie._id || String(movie._id).startsWith("tmdb-");

    if (isTMDB) {
      handleToggleWatched({
        source: "tmdb",
        tmdbId: movie.id || movie.tmdbId,
        mediaType,
      });
    } else {
      handleToggleWatched({
        source: "local",
        movieId: movie._id,
      });
    }
  };

  const onEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit) {
      onEdit(movie);
    }
  };

  return (
    <div className="group relative w-42.5 shrink-0 select-none">
      <div className="w-full">
        <div
          className="relative aspect-2/3 w-full overflow-hidden rounded-3xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ backgroundColor: "var(--card-color)" }}
        >
          {posterImage ? (
            <img
              src={posterImage}
              alt={movie.title || movie.name}
              loading="eager"
              draggable={false}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-white/5 text-xs text-gray-400">
              No Image
            </div>
          )}

          {progress !== undefined && progress > 0 && (
            <div className="absolute bottom-0 left-0 h-1 w-full bg-white/20">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${Math.min(Math.max(progress, 0), 100)}%`,
                  backgroundColor: "var(--primary)",
                }}
              />
            </div>
          )}
        </div>

        <div className="mt-2.5">
          <div className="flex items-center justify-between gap-1.5">
            <h3
              className="min-w-0 flex-1 truncate text-sm font-semibold"
              style={{ color: "var(--text-color)" }}
              title={movie.title || movie.name}
            >
              {movie.title || movie.name}
            </h3>

            <span
              className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold text-white shadow-xs"
              style={{ backgroundColor: "var(--primary)" }}
            >
              {rating}
            </span>
          </div>
        </div>
      </div>

      {user && (
        <div className="movie-card-hover-actions absolute top-3 right-3 z-10 flex flex-col gap-2 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {isAdminView ? (
            <button
              type="button"
              onClick={onEditClick}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 text-white backdrop-blur-xl transition-all duration-200 hover:scale-105 shadow-md"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.55)" }}
              title="Edit Movie"
            >
              <MdEdit size={18} />
            </button>
          ) : (
            <>
              {/* Like Button */}
              <button
                type="button"
                onClick={onLikeClick}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 text-white backdrop-blur-xl transition-all duration-200 hover:scale-105 shadow-md"
                style={{
                  backgroundColor: isLiked
                    ? "var(--primary)"
                    : "rgba(0, 0, 0, 0.35)",
                }}
                title={isLiked ? "Unlike" : "Like"}
              >
                <FiHeart size={18} className={isLiked ? "fill-white" : ""} />
              </button>

              {/* Watchlist Button */}
              <button
                type="button"
                onClick={onWatchlistClick}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 text-white backdrop-blur-xl transition-all duration-200 hover:scale-105 shadow-md"
                style={{
                  backgroundColor: isWatchlist
                    ? "var(--primary)"
                    : "rgba(0, 0, 0, 0.35)",
                }}
                title={
                  isWatchlist ? "Remove from Watchlist" : "Add to Watchlist"
                }
              >
                <FiPlus size={18} />
              </button>

              {/* Watched Button */}
              <button
                type="button"
                onClick={onWatchedClick}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 text-white backdrop-blur-xl transition-all duration-200 hover:scale-105 shadow-md"
                style={{
                  backgroundColor: isWatched
                    ? "var(--primary)"
                    : "rgba(0, 0, 0, 0.35)",
                }}
                title={isWatched ? "Mark as Unwatched" : "Mark as Watched"}
              >
                <FiCheck size={18} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default MovieCard;
