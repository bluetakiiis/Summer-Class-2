import { Outlet } from "react-router-dom";

import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import AddButton from "../components/ui/AddButton";
import MovieForm from "../components/forms/MovieForm";

function PublicLayout({
  sidebarOpen,
  setSidebarOpen,
  isBlueTheme,
  setIsBlueTheme,
  isAdding,
  setIsAdding,
  handleAddNewMovie,
  user,
}) {
  return (
    <div
      className={`flex flex-col h-screen w-full overflow-hidden ${
        isBlueTheme ? "blue-theme" : ""
      }`}
      style={{
        backgroundColor: "var(--background)",
        transition: "background-color .3s ease",
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
                onSave={(movie) => {
                  handleAddNewMovie(movie);
                  setIsAdding(false);
                }}
                onCancel={() => setIsAdding(false)}
              />
            )}

            <Outlet />
          </div>

          {user && <AddButton onClick={() => setIsAdding(true)} />}
        </main>
      </div>
    </div>
  );
}

export default PublicLayout;
