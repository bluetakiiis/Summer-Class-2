import { useState, useEffect } from "react";
import { MovieContext } from "./MovieContext";
import axios from "axios";

const API_URL = "http://localhost:5000/movies";

export const MovieProvider = ({ children }) => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all movies
  const fetchMovies = async () => {
    try {
      const response = await axios.get(API_URL);
      setMovieList(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      await fetchMovies();
    };

    loadMovies();
  }, []);

  // ========================
  // ADD MOVIE
  // ========================
  const handleAddNewMovie = async (newMovie) => {
    try {
      const response = await axios.post(API_URL, newMovie);

      setMovieList((prevMovies) => [response.data, ...prevMovies]);
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  // ========================
  // UPDATE MOVIE
  // ========================
  const handleUpdateMovie = async (updatedMovie) => {
    try {
      const response = await axios.put(
        `${API_URL}/${updatedMovie._id}`,
        updatedMovie,
      );

      setMovieList((prevMovies) =>
        prevMovies.map((movie) =>
          movie._id === updatedMovie._id ? response.data : movie,
        ),
      );
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  // ========================
  // DELETE MOVIE
  // ========================
  const handleDeleteMovie = async (movieId) => {
    try {
      await axios.delete(`${API_URL}/${movieId}`);

      setMovieList((prevMovies) =>
        prevMovies.filter((movie) => movie._id !== movieId),
      );
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  // ========================
  // TOGGLE LIKE
  // ========================
  const handleToggleLike = async (movieId) => {
    try {
      const movie = movieList.find((m) => m._id === movieId);

      if (!movie) return;

      const updatedMovie = {
        ...movie,
        liked: !movie.liked,
      };

      const response = await axios.put(`${API_URL}/${movieId}`, updatedMovie);

      setMovieList((prevMovies) =>
        prevMovies.map((movie) =>
          movie._id === movieId ? response.data : movie,
        ),
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
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
