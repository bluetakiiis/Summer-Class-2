import MovieGrid from "../../components/movies/MovieGrid";
import AddButton from "../../components/ui/AddButton";
import MovieForm from "../../components/forms/MovieForm";

function AdminShows({ movies, isAdding, setIsAdding, handleAddNewMovie }) {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold" style={{ color: "var(--text)" }}>
        Manage Shows
      </h1>

      {isAdding ? (
        <MovieForm
          onSave={(movie) => {
            handleAddNewMovie(movie);
            setIsAdding(false);
          }}
          onCancel={() => setIsAdding(false)}
        />
      ) : (
        <>
          <MovieGrid movies={movies} />

          <AddButton isAdmin={true} onClick={() => setIsAdding(true)} />
        </>
      )}
    </>
  );
}

export default AdminShows;
