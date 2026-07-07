import { NavLink } from "react-router-dom";
import { MdDoneAll, MdBookmarkBorder, MdFavoriteBorder } from "react-icons/md";

function Sidebar() {
  const linkBaseClass =
    "group flex w-full items-center gap-4 rounded-full px-4 py-3 transition-all duration-200 hover:scale-[1.02] hover:bg-white/60";

  const getLinkStyle = (isActive) => ({
    background: isActive ? "var(--active-gradient)" : "transparent",
    color: "var(--text)",
    boxShadow: isActive ? "0 1px 3px 0 rgb(0 0 0 / 0.1)" : "none",
  });

  return (
    <aside
      className="h-full w-64 overflow-y-auto px-5 py-8"
      style={{
        backgroundColor: "var(--sidebar)",
      }}
    >
      <div className="grid gap-4">
        <NavLink
          to="/watched"
          style={({ isActive }) => getLinkStyle(isActive)}
          className={({ isActive }) =>
            `${linkBaseClass} ${isActive ? "shadow-sm" : ""}`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                style={{
                  backgroundColor: isActive
                    ? "var(--primary)"
                    : "rgba(255,255,255,0.7)",
                }}
              >
                <MdDoneAll
                  size={20}
                  style={{ color: isActive ? "#fff" : "var(--primary)" }}
                />
              </div>
              <span className={isActive ? "font-semibold" : ""}>Watched</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/watchlist"
          style={({ isActive }) => getLinkStyle(isActive)}
          className={({ isActive }) =>
            `${linkBaseClass} ${isActive ? "shadow-sm" : ""}`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                style={{
                  backgroundColor: isActive
                    ? "var(--primary)"
                    : "rgba(255,255,255,0.7)",
                }}
              >
                <MdBookmarkBorder
                  size={20}
                  style={{ color: isActive ? "#fff" : "var(--primary)" }}
                />
              </div>
              <span className={isActive ? "font-semibold" : ""}>
                Watch List
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/liked"
          style={({ isActive }) => getLinkStyle(isActive)}
          className={({ isActive }) =>
            `${linkBaseClass} ${isActive ? "shadow-sm" : ""}`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                style={{
                  backgroundColor: isActive
                    ? "var(--primary)"
                    : "rgba(255,255,255,0.7)",
                }}
              >
                <MdFavoriteBorder
                  size={20}
                  style={{ color: isActive ? "#fff" : "var(--primary)" }}
                />
              </div>
              <span className={isActive ? "font-semibold" : ""}>Liked</span>
            </>
          )}
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
