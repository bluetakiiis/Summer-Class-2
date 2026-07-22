import { useState, useContext } from "react";
import {
  MdFavoriteBorder,
  MdFavorite,
  MdPlayArrow,
  MdEdit,
} from "react-icons/md";

import genreStyles from "../../data/genres.json";
import EditForm from "../forms/EditForm";
import { MovieContext } from "../../context/MovieContext";

function MovieCard({ movie }) {
  const { handleToggleLike, handleUpdateMovie, handleDeleteMovie } =
    useContext(MovieContext);

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedMovie) => {
    handleUpdateMovie(updatedMovie);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <EditForm
        movie={movie}
        onSave={handleSave}
        onCancel={handleCancel}
        onDelete={handleDeleteMovie}
      />
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-[15px] bg-(--card-color) shadow-[0_5px_15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1.25 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)]">
      <div className="flex h-100">
        {/* Poster */}
        <div className="w-70 shrink-0 overflow-hidden">
          <picture>
            <source media="(max-width:768px)" srcSet={movie.imageMobile} />
            <img
              src={movie.image}
              alt={movie.title}
              className="h-full w-full object-cover"
            />
          </picture>
        </div>

        {/* Right Side */}
        <div className="flex flex-1 flex-col p-6">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between gap-4">
              <h2 className="flex-1 text-[1.75rem] font-semibold leading-none text-(--text-color)">
                {movie.title}
              </h2>

              <div className="flex items-center gap-2">
                {/* Edit Button */}
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 cursor-pointer"
                  style={{
                    background: "rgba(var(--primary-color-rgb),0.08)",
                  }}
                >
                  <MdEdit
                    size={20}
                    style={{
                      color: "var(--secondary-color)",
                    }}
                  />
                </button>

                {/* Favourite Button */}
                <button
                  onClick={() => handleToggleLike(movie._id)}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 cursor-pointer"
                  style={{
                    background: "rgba(var(--primary-color-rgb),0.08)",
                  }}
                >
                  {movie.liked ? (
                    <MdFavorite
                      size={20}
                      style={{
                        color: "var(--secondary-color)",
                      }}
                    />
                  ) : (
                    <MdFavoriteBorder
                      size={20}
                      style={{
                        color: "var(--secondary-color)",
                      }}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Underline */}
            <div
              className="mt-3 h-0.5 w-full"
              style={{
                background: "var(--primary-color)",
              }}
            />
          </div>

          {/* Description */}
          <p className="mt-5 text-[15px] leading-[1.6] text-(--text-light)">
            {movie.description}
          </p>

          {/* Information */}
          <div className="mt-5 flex flex-col gap-5">
            {/* Genre */}
            <div className="flex flex-wrap items-center gap-2">
              <strong className="mr-1 text-[15px] font-bold text-(--text-color)">
                Genre:
              </strong>

              {movie.genres.map((genre) => {
                const style =
                  genreStyles[genre.toLowerCase()] ?? genreStyles.default;

                return (
                  <span
                    key={genre}
                    className="rounded-full px-4 py-1.75 text-[13px] font-semibold"
                    style={{
                      background: style.bg,
                      color: style.text || "#333",
                    }}
                  >
                    {genre}
                  </span>
                );
              })}
            </div>

            {/* Episodes */}
            <div className="flex items-center">
              <strong className="text-[15px] font-bold text-(--text-color)">
                Episodes:
              </strong>
              <span className="ml-2 text-[15px] text-(--text-light)">
                {movie.episodes}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center">
              <strong className="text-[15px] font-bold text-(--text-color)">
                Rating:
              </strong>
              <span className="ml-2 text-[15px] text-(--text-light)">
                {movie.rating}
              </span>
            </div>
          </div>

          {/* Push button to bottom */}
          <div className="flex-1" />

          {/* Watch Button */}
          <a
            href={movie.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full px-6 py-2.5 text-[15px] font-bold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: "var(--secondary-color)",
            }}
          >
            <MdPlayArrow size={18} />
            Watch Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
