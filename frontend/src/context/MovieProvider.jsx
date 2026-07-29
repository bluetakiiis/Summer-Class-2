import { useState, useEffect, useContext } from "react";
import { MovieContext } from "./MovieContext";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const API_URL = "http://localhost:5000/movies";
const USER_API = "http://localhost:5000/users";

export const MovieProvider = ({ children }) => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, setUser } = useContext(AuthContext);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  };

  const refreshUser = async () => {
    if (!user) return;

    const userId = user._id;

    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(response.data);
      console.log("Liked:", response.data.liked);
      console.log("Watchlist:", response.data.watchlist);
      console.log("Watched:", response.data.watched);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (err) {
      console.error("Failed to refresh user", err);
    }
  };

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

  const handleAddNewMovie = async (newMovie) => {
    try {
      const response = await axios.post(API_URL, newMovie, getAuthHeaders());

      setMovieList((prevMovies) => [response.data, ...prevMovies]);
    } catch (error) {
      console.error(
        "Error adding movie:",
        error.response?.data || error.message,
      );
    }
  };

  const handleUpdateMovie = async (updatedMovie) => {
    const movieId = updatedMovie._id;

    try {
      const response = await axios.put(
        `${API_URL}/${movieId}`,
        updatedMovie,
        getAuthHeaders(),
      );

      setMovieList((prevMovies) =>
        prevMovies.map((movie) =>
          movie._id === movieId ? response.data : movie,
        ),
      );
    } catch (error) {
      console.error(
        "Error updating movie:",
        error.response?.data || error.message,
      );
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      await axios.delete(`${API_URL}/${movieId}`, getAuthHeaders());

      setMovieList((prevMovies) =>
        prevMovies.filter((movie) => movie._id !== movieId),
      );
    } catch (error) {
      console.error(
        "Error deleting movie:",
        error.response?.data || error.message,
      );
    }
  };

  const handleToggleLike = async (data) => {
    try {
      await axios.put(`${USER_API}/like`, data, getAuthHeaders());

      await refreshUser();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleToggleWatchlist = async (data) => {
    try {
      await axios.put(`${USER_API}/watchlist`, data, getAuthHeaders());

      await refreshUser();
    } catch (error) {
      console.error("Error toggling watchlist:", error);
    }
  };

  const handleToggleWatched = async (data) => {
    try {
      await axios.put(`${USER_API}/watched`, data, getAuthHeaders());

      await refreshUser();
    } catch (error) {
      console.error("Error toggling watched:", error);
    }
  };

  const [isBlueTheme, setIsBlueTheme] = useState(false);

  return (
    <MovieContext.Provider
      value={{
        movieList,
        loading,

        handleToggleLike,
        handleToggleWatchlist,
        handleToggleWatched,

        handleUpdateMovie,
        handleDeleteMovie,
        handleAddNewMovie,

        isBlueTheme,
        setIsBlueTheme,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
