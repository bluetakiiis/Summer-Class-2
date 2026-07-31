import { useState, useContext } from "react";
import MovieGrid from "../../components/movies/MovieGrid";
import AddButton from "../../components/ui/AddButton";
import MovieForm from "../../components/forms/MovieForm";
import EditForm from "../../components/forms/EditForm";
import { MovieContext } from "../../context/MovieContext";

function AdminShows({ movies, isAdding, setIsAdding, handleAddNewMovie }) {
  const [editingMovie, setEditingMovie] = useState(null);
  const { handleUpdateMovie } = useContext(MovieContext);

  const handleSaveEdit = (updatedMovie) => {
    handleUpdateMovie(updatedMovie);
    setEditingMovie(null);
  };

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold" style={{ color: "var(--text)" }}>
        Manage Shows
      </h1>

      {/* 1. Show Add Form if adding */}
      {isAdding ? (
        <MovieForm
          onSave={(movie) => {
            handleAddNewMovie(movie);
            setIsAdding(false);
          }}
          onCancel={() => setIsAdding(false)}
        />
      ) : editingMovie ? (
        /* 2. Show Edit Form at exact same top level width as MovieForm */
        <EditForm
          movie={editingMovie}
          onSave={handleSaveEdit}
          onCancel={() => setEditingMovie(null)}
        />
      ) : (
        /* 3. Otherwise show Movies Grid */
        <>
          <MovieGrid
            movies={movies}
            onEdit={(movie) => setEditingMovie(movie)}
          />

          <AddButton isAdmin={true} onClick={() => setIsAdding(true)} />
        </>
      )}
    </>
  );
}

export default AdminShows;
