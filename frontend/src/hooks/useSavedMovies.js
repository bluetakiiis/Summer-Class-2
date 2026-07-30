import { useEffect, useState, useContext } from "react";
import { getTMDBDetails } from "../services/tmdbService";
import { MovieContext } from "../context/MovieContext";

export default function useSavedMovies(savedItems = []) {
  const { movieList } = useContext(MovieContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadMovies() {
      const result = [];

      for (const item of savedItems) {
        if (item.source === "local") {
          const localId =
            typeof item.movieId === "object" ? item.movieId?._id : item.movieId;

          const movie = movieList.find(
            (m) => String(m._id) === String(localId),
          );

          if (movie) {
            result.push(movie);
          }
        } else {
          try {
            // Uses item.mediaType saved in DB
            const movie = await getTMDBDetails(item.tmdbId, item.mediaType);

            if (movie) {
              result.push(movie);
            }
          } catch (err) {
            console.error("Error fetching TMDB details:", err);
          }
        }
      }

      setMovies(result);
    }

    loadMovies();
  }, [savedItems, movieList]);

  return movies;
}
