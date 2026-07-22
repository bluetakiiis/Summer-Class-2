import { useState, useRef, useEffect } from "react";

const FormRow = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
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
      className="flex-1 rounded-lg border border-(--btn-shadow) bg-white px-2 py-1 text-[0.75rem] text-[#555] outline-none transition-all duration-150 focus:border-(--primary-color) focus:shadow-[0_0_0_2px_var(--focus-glow)]"
    />
  </div>
);

function EditForm({ movie, onSave, onCancel, onDelete }) {
  const [formData, setFormData] = useState({
    title: movie.title || "",
    description: movie.description || "",
    genres: movie.genres ? movie.genres.join(", ") : "",
    episodes: movie.episodes || "",
    rating: movie.rating || "",
    link: movie.link || "",
    image: movie.image || "",
    imageMobile: movie.imageMobile || "",
    list: movie.list || "watched",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomDropdownChange = (value) => {
    setFormData((prev) => ({ ...prev, list: value }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMovie = {
      ...movie,
      ...formData,
      genres: formData.genres
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean),
    };
    onSave(updatedMovie);
  };

  const listOptions = [
    { label: "Watched", value: "watched" },
    { label: "Watch List", value: "watchlist" },
  ];
  const currentListLabel =
    listOptions.find((opt) => opt.value === formData.list)?.label || "Watched";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full overflow-hidden rounded-[15px] bg-(--card-color) shadow-[0_8px_30px_var(--shadow-medium)] ring-[3px] ring-(--primary-color) transition-all duration-300"
    >
      <div className="flex h-100">
        {/* Left Side: Poster */}
        <div className="w-70 shrink-0 overflow-hidden">
          <picture>
            <source media="(max-width:768px)" srcSet={formData.imageMobile} />
            <img
              src={formData.image}
              alt="Movie Poster Preview"
              className="h-full w-full object-cover opacity-80"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/280x400?text=No+Image";
              }}
            />
          </picture>
        </div>

        {/* Right Side: Form Inputs */}
        <div className="custom-scrollbar flex flex-1 flex-col overflow-y-auto p-5">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Drama Title"
            className="mb-2 w-full rounded-lg border border-(--btn-shadow) bg-white px-3 py-1.5 text-[1.5rem] font-semibold text-(--text-color) outline-none transition-all duration-150 focus:border-(--primary-color) focus:shadow-[0_0_0_2px_var(--focus-glow)]"
          />

          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description..."
            className="mb-2 w-full rounded-lg border border-(--btn-shadow) bg-white px-3 py-1 text-[14px] leading-[1.6] text-[#555] outline-none transition-all duration-150 focus:border-(--primary-color) focus:shadow-[0_0_0_2px_var(--focus-glow)]"
          />

          <FormRow
            label="Genres:"
            name="genres"
            value={formData.genres}
            onChange={handleChange}
            placeholder="Comedy, Youth, Drama"
          />
          <FormRow
            label="Episodes:"
            name="episodes"
            value={formData.episodes}
            onChange={handleChange}
            placeholder="16"
          />
          <FormRow
            label="Rating:"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="8/10"
          />

          <div className="mt-[0.4rem] flex items-center gap-2 rounded-lg bg-(--primary-bg-light) px-2 py-[0.35rem]">
            <span className="min-w-19.5 whitespace-nowrap text-[0.7rem] font-semibold text-[#999]">
              List:
            </span>
            <div className="relative flex-1" ref={dropdownRef}>
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-lg border bg-white px-2 py-1 text-[0.75rem] text-[#555] outline-none transition-all duration-150 ${
                  isDropdownOpen
                    ? "border-(--primary-color) shadow-[0_0_0_2px_var(--focus-glow)]"
                    : "border-(--btn-shadow) hover:border-(--primary-color)"
                }`}
              >
                <span>{currentListLabel}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#555"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>

              {isDropdownOpen && (
                <div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-lg border border-(--btn-shadow) bg-white shadow-lg">
                  {listOptions.map((opt) => (
                    <div
                      key={opt.value}
                      onClick={() => handleCustomDropdownChange(opt.value)}
                      className={`cursor-pointer px-3 py-1.5 text-[0.75rem] transition-colors duration-150 ${
                        formData.list === opt.value
                          ? "bg-(--primary-color) font-medium text-white"
                          : "text-[#555] hover:bg-(--primary-bg-light)"
                      }`}
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <FormRow
            label="Watch URL:"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://..."
          />
          <FormRow
            label="Image URL:"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://..."
          />
          <FormRow
            label="Mobile URL:"
            name="imageMobile"
            value={formData.imageMobile}
            onChange={handleChange}
            placeholder="https://..."
          />

          <div className="flex-1" />

          <div className="mt-4 flex w-full flex-nowrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-full bg-[#d9d9d9] px-5 py-2 text-[0.82rem] font-bold text-[#555] transition-all duration-200 hover:scale-105 hover:bg-[#bfbfbf]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onDelete(movie._id)}
              className="rounded-full bg-[rgba(255,100,100,0.304)] px-5 py-2 text-[0.82rem] font-bold text-[#ea3b3b] transition-all duration-200 hover:scale-105 hover:bg-[rgba(255,100,100,0.42)]"
            >
              Delete
            </button>
            <button
              type="submit"
              className="rounded-full bg-(--primary-color) px-5 py-2 text-[0.82rem] font-bold text-white transition-all duration-200 hover:scale-105 hover:bg-(--secondary-color)"
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
