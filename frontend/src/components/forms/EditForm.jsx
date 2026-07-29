import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const FormRow = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
}) => (
  <div className="mt-[0.4rem] flex items-center gap-2 rounded-lg bg-(--primary-bg-light) px-2 py-[0.35rem]">
    <span className="min-w-19.5 whitespace-nowrap text-[0.7rem] font-semibold text-[#999]">
      {label}
    </span>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      className="flex-1 rounded-lg border border-(--btn-shadow) bg-white px-2 py-1 text-[0.75rem] text-[#555] outline-none transition-all duration-150 focus:border-(--primary-color) focus:shadow-[0_0_0_2px_var(--focus-glow)]"
    />
  </div>
);

function EditForm({ movie = {}, onSave, onCancel }) {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: movie.title || "",
    rating: movie.rating || "",
    image: movie.image || movie.posterURL || "",
    totalEpisodes: movie.totalEpisodes || movie.episodes?.length || 1,
  });

  const isAdmin = user?.role === "admin" || user?.isAdmin;
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMovie = {
      ...movie,
      ...formData,
      totalEpisodes: Number(formData.totalEpisodes) || 1,
    };
    
    delete updatedMovie.videoUrl;

    onSave(updatedMovie);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full overflow-hidden rounded-[15px] bg-(--card-color) shadow-[0_8px_30px_var(--shadow-medium)] ring-[3px] ring-(--primary-color) transition-all duration-300"
    >
      <div className="flex h-88">
        {/* Left Side: Poster Preview */}
        <div className="flex w-60 shrink-0 items-center justify-center overflow-hidden bg-gray-100">
          {formData.image ? (
            <img
              src={formData.image}
              alt="Movie Poster Preview"
              className="h-full w-full object-cover opacity-80"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/280x400?text=Invalid+URL";
              }}
            />
          ) : (
            <span className="text-sm font-semibold text-gray-400">
              Image Preview
            </span>
          )}
        </div>

        {/* Right Side: Form Inputs */}
        <div className="custom-scrollbar flex flex-1 flex-col overflow-y-auto p-5">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="mb-2 w-full rounded-lg border border-(--btn-shadow) bg-white px-3 py-1.5 text-[1.5rem] font-semibold text-(--text-color) outline-none transition-all duration-150 focus:border-(--primary-color) focus:shadow-[0_0_0_2px_var(--focus-glow)]"
          />

          <FormRow
            label="Rating:"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="8/10"
          />

          <FormRow
            label="Image URL:"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://..."
          />

          <FormRow
            label="Episodes:"
            name="totalEpisodes"
            type="number"
            min={1}
            value={formData.totalEpisodes}
            onChange={handleChange}
            placeholder="1"
          />

          <div className="flex-1 min-h-4" />

          {/* Action Buttons */}
          <div className="mt-4 flex w-full flex-nowrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="cursor-pointer rounded-full bg-[#d9d9d9] px-5 py-2 text-[0.82rem] font-bold text-[#555] transition-all duration-200 hover:scale-105 hover:bg-[#bfbfbf]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded-full bg-(--primary-color) px-5 py-2 text-[0.82rem] font-bold text-white transition-all duration-200 hover:scale-105 hover:bg-(--secondary-color)"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditForm;
