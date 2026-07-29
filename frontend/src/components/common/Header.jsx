import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdMenu, MdSearch, MdLogout } from "react-icons/md";
import ThemeToggle from "../ui/ThemeToggle";
import { AuthContext } from "../../context/AuthContext";
import { TMDBContext } from "../../context/TMDBContext";
import { logout } from "../../services/auth";

function Header({ sidebarOpen, setSidebarOpen, isBlueTheme, setIsBlueTheme }) {
  const { user, setUser } = useContext(AuthContext);
  const { search } = useContext(TMDBContext) || {};
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 1. Call backend logout function
      await logout();

      // 2. Clear local storage for stateless JWT auth
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // 3. Clear the user from React's global AuthContext
      if (setUser) {
        setUser(null);
      }

      // 4. Redirect to the login or landing page
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

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
              className="w-full rounded-full border-2 border-white/50 bg-white/20 py-1 pl-10 pr-4 text-sm text-white placeholder-white/80 outline-none transition focus:border-white focus:bg-white/30"
              onChange={(e) => search?.(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  search?.(e.target.value);
                }
              }}
            />
          </div>

          <ThemeToggle
            isBlueTheme={isBlueTheme}
            setIsBlueTheme={setIsBlueTheme}
          />

          {/* User Profile Avatar (if available) */}
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              className="h-8 w-8 rounded-full border-2 border-white/80 object-cover"
              title={user.displayName || user.email}
            />
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="Log Out"
            className="cursor-pointer text-white transition hover:scale-110 active:scale-95"
          >
            <MdLogout size={26} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
