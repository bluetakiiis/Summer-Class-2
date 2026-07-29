import { useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { MovieContext } from "./context/MovieContext";
import { AuthContext } from "./context/AuthContext";

import Home from "./pages/Home";
import Liked from "./pages/Liked";
import Watchlist from "./pages/Watchlist";
import Watched from "./pages/Watched";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import AdminShows from "./pages/admin/AdminShows";
import AdminUsers from "./pages/admin/AdminUsers";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const {
    movieList,
    loading: moviesLoading,
    handleAddNewMovie,
    isBlueTheme,
    setIsBlueTheme,
  } = useContext(MovieContext);
  const [isAdding, setIsAdding] = useState(false);

  // Pull movie state and authentication state from contexts
  const { user, loading: authLoading } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div
        className="flex h-screen items-center justify-center"
        style={{
          background: "var(--background)",
          color: "var(--text-light)",
        }}
      />
    );
  }

  // Helper function to filter local database movies based on theme
  const getFilteredMovies = () => {
    if (!movieList) return [];
    return movieList.filter((movie) => {
      const episodeCount = Number(
        movie.totalEpisodes || movie.episodes?.length || 1,
      );
      return isBlueTheme ? episodeCount === 1 : episodeCount > 1;
    });
  };

  // Extract Admin Recommended Shows from the currently filtered list
  const currentFilteredMovies = getFilteredMovies();

  const adminRecommendedShows = currentFilteredMovies.filter(
    (movie) =>
      movie.isAdminRecommended ||
      movie.isFeatured ||
      movie.recommendedByAdmin ||
      movie.addedByRole === "admin" ||
      movie.addedBy === "admin",
  );

  if (moviesLoading) {
    return (
      <div
        className="flex h-screen items-center justify-center text-lg"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--text-light)",
        }}
      >
        Fetching your dramas...
      </div>
    );
  }

  return (
    <Routes>
      {/* ================= PUBLIC LAYOUT ================= */}
      <Route
        element={
          <PublicLayout
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            isBlueTheme={isBlueTheme}
            setIsBlueTheme={setIsBlueTheme}
            isAdding={isAdding}
            setIsAdding={setIsAdding}
            handleAddNewMovie={handleAddNewMovie}
            user={user}
          />
        }
      >
        <Route
          index
          element={
            <Home
              adminRecommendedShows={adminRecommendedShows}
              currentFilteredMovies={currentFilteredMovies}
            />
          }
        />

        <Route
          path="liked"
          element={
            user ? (
              <Liked movies={user.liked || []} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="watchlist"
          element={
            user ? (
              <Watchlist movies={user.watchlist || []} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="watched"
          element={
            user ? (
              <Watched movies={user.watched || []} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Route>

      {/* ================= ADMIN LAYOUT ================= */}
      <Route
        path="/admin"
        element={
          user?.role === "admin" ? (
            <AdminLayout
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              isBlueTheme={isBlueTheme}
              setIsBlueTheme={setIsBlueTheme}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      >
        <Route index element={<Navigate to="shows" replace />} />

        <Route
          path="shows"
          element={
            <AdminShows
              movies={currentFilteredMovies}
              isAdding={isAdding}
              setIsAdding={setIsAdding}
              handleAddNewMovie={handleAddNewMovie}
            />
          }
        />

        <Route path="users" element={<AdminUsers />} />
      </Route>

      {/* Fallback Catch-All Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
