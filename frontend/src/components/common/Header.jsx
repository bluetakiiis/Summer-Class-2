import { MdMenu, MdSearch, MdKey } from "react-icons/md";
import ThemeToggle from "../ui/ThemeToggle";

function Header({ sidebarOpen, setSidebarOpen, isBlueTheme, setIsBlueTheme }) {
  return (
    <nav
      className="sticky top-0 z-50 px-10 py-4 shadow-md"
      style={{ backgroundColor: "var(--primary)" }}
    >
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="cursor-pointer text-white transition hover:scale-110 active:scale-95"
          >
            <MdMenu size={32} />
          </button>

          <h1 className="text-2xl font-semibold text-white">Reko</h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <div className="relative w-60">
            <MdSearch
              size={20}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white"
            />

            <input
              type="text"
              placeholder="Search dramas..."
              className="w-full rounded-full border-2 border-white/50 bg-white/20 py-1 pl-10 pr-4 text-sm text-white placeholder-white/80 outline-none"
            />
          </div>

          <ThemeToggle
            isBlueTheme={isBlueTheme}
            setIsBlueTheme={setIsBlueTheme}
          />

          <button className="cursor-pointer text-white transition hover:scale-110 active:scale-95">
            <MdKey size={28} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
