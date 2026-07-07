import { useState, useEffect } from "react";
import { MovieContext } from "./MovieContext";
import initialMovies from "../data/movies.json";

export const MovieProvider = ({ children }) => {
  // 1. Start with an empty list and a loading state (Matching PDF Page 7)
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Use useEffect to handle the "Side Effect" of data loading
  useEffect(() => {
    // Simulating an API network request with an 800ms delay
    const fetchMovies = () => {
      setTimeout(() => {
        setMovieList(initialMovies); // Populate data
        setLoading(false); // Turn off loading state
      }, 800);
    };

    fetchMovies();
  }, []); // Empty array ensures this runs only ONCE on mount

  const handleToggleLike = (movieId) => {
    setMovieList((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId ? { ...movie, liked: !movie.liked } : movie,
      ),
    );
  };

  const handleUpdateMovie = (updatedMovie) => {
    setMovieList((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie,
      ),
    );
  };

  const handleDeleteMovie = (movieId) => {
    setMovieList((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== movieId),
    );
  };

  const handleAddNewMovie = (newMovie) => {
    setMovieList((prevMovies) => [newMovie, ...prevMovies]);
  };

  return (
    <MovieContext.Provider
      value={{
        movieList,
        loading,
        handleToggleLike,
        handleUpdateMovie,
        handleDeleteMovie,
        handleAddNewMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
