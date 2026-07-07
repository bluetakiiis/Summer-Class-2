import { useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import MovieCard from "./components/cards/MovieCard";
import AddButton from "./components/ui/AddButton";
import MovieForm from "./components/forms/MovieForm";
import { MovieContext } from "./context/MovieContext";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isBlueTheme, setIsBlueTheme] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const { movieList, loading, handleAddNewMovie } = useContext(MovieContext);

  const getFilteredMovies = (section) => {
    if (!movieList) return [];

    return movieList.filter((movie) => {
      const episodeCount = Number(movie.episodes);
      const matchesTheme = isBlueTheme ? episodeCount === 1 : episodeCount > 1;

      let matchesSection = false;

      if (section === "watched") matchesSection = movie.list === "watched";
      else if (section === "watchlist")
        matchesSection = movie.list === "watchlist";
      else if (section === "liked") matchesSection = movie.liked === true;

      return matchesTheme && matchesSection;
    });
  };

  return (
    <div
      className={`flex flex-col h-screen w-full overflow-hidden ${isBlueTheme ? "blue-theme" : ""}`}
      style={{
        backgroundColor: "var(--background)",
        transition: "background-color 0.3s ease",
      }}
    >
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isBlueTheme={isBlueTheme}
        setIsBlueTheme={setIsBlueTheme}
      />

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <Sidebar />}

        <main className="flex-1 overflow-y-auto px-5 py-8">
          <div className="mx-auto flex max-w-300 flex-col gap-8">
            {isAdding && (
              <MovieForm
                onSave={(newMovie) => {
                  handleAddNewMovie(newMovie);
                  setIsAdding(false);
                }}
                onCancel={() => setIsAdding(false)}
              />
            )}

            {}
            {loading ? (
              <div
                className="flex h-40 items-center justify-center text-lg"
                style={{ color: "var(--text-light)" }}
              >
                Fetching your dramas...
              </div>
            ) : (
              <Routes>
                <Route
                  path="/watched"
                  element={getFilteredMovies("watched").map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                />

                <Route
                  path="/watchlist"
                  element={getFilteredMovies("watchlist").map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                />

                <Route
                  path="/liked"
                  element={getFilteredMovies("liked").map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                />

                <Route path="/" element={<Navigate to="/watched" replace />} />
              </Routes>
            )}
          </div>

          <AddButton onClick={() => setIsAdding(true)} />
        </main>
      </div>
    </div>
  );
}

export default App;
