import { MdToggleOff, MdToggleOn } from "react-icons/md";

function ThemeToggle({ isBlueTheme, setIsBlueTheme }) {
  return (
    <button
      onClick={() => setIsBlueTheme(!isBlueTheme)}
      className="cursor-pointer text-white transition hover:scale-110 active:scale-95"
    >
      {isBlueTheme ? <MdToggleOn size={36} /> : <MdToggleOff size={36} />}
    </button>
  );
}

export default ThemeToggle;
