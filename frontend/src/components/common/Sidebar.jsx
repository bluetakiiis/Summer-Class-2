import { useState, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  MdDoneAll,
  MdBookmarkBorder,
  MdFavoriteBorder,
  MdHome,
  MdTv,
  MdPeople,
} from "react-icons/md";

import UserLoginForm from "../auth/UserLoginForm";
import AdminLoginForm from "../auth/AdminLoginForm";
import { AuthContext } from "../../context/AuthContext";

function Sidebar() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("user"); 
  const location = useLocation();

  // Determine strictly if viewing the admin layout based on route path
  const isAdminView = location.pathname.startsWith("/admin");

  const linkBaseClass =
    "group flex w-full items-center gap-4 rounded-full px-4 py-3 transition-all duration-200 hover:scale-[1.02] hover:bg-white/60";

  const getLinkStyle = (isActive) => ({
    background: isActive ? "var(--active-gradient)" : "transparent",
    color: "var(--text)",
    boxShadow: isActive ? "0 1px 3px 0 rgb(0 0 0 / 0.1)" : "none",
  });

  return (
    <aside
      className="flex h-full w-72 shrink-0 flex-col overflow-y-auto px-4 py-6 transition-all duration-300"
      style={{
        backgroundColor: "var(--sidebar)",
      }}
    >
      <div className="flex flex-1 flex-col justify-between">
        {/* 1. Show Navigation Links ONLY when Logged In */}
        {user ? (
          <div className="flex flex-1 flex-col justify-between animate-fadeIn">
            <nav className="grid gap-3 sidebar-links">
              {isAdminView ? (
                /* --- ADMIN NAVIGATION LINKS --- */
                <>
                  <NavLink
                    to="/admin/shows"
                    end
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
                          <MdTv
                            size={20}
                            style={{
                              color: isActive ? "#fff" : "var(--primary)",
                            }}
                          />
                        </div>
                        <span
                          className={
                            isActive ? "font-semibold text-sm" : "text-sm"
                          }
                        >
                          Shows
                        </span>
                      </>
                    )}
                  </NavLink>

                  <NavLink
                    to="/admin/users"
                    end
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
                          <MdPeople
                            size={20}
                            style={{
                              color: isActive ? "#fff" : "var(--primary)",
                            }}
                          />
                        </div>
                        <span
                          className={
                            isActive ? "font-semibold text-sm" : "text-sm"
                          }
                        >
                          Users
                        </span>
                      </>
                    )}
                  </NavLink>
                </>
              ) : (
                /* --- USER NAVIGATION LINKS --- */
                <>
                  <NavLink
                    to="/"
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
                          <MdHome
                            size={20}
                            style={{
                              color: isActive ? "#fff" : "var(--primary)",
                            }}
                          />
                        </div>
                        <span
                          className={
                            isActive ? "font-semibold text-sm" : "text-sm"
                          }
                        >
                          Home
                        </span>
                      </>
                    )}
                  </NavLink>

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
                            style={{
                              color: isActive ? "#fff" : "var(--primary)",
                            }}
                          />
                        </div>
                        <span
                          className={
                            isActive ? "font-semibold text-sm" : "text-sm"
                          }
                        >
                          Watched
                        </span>
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
                            style={{
                              color: isActive ? "#fff" : "var(--primary)",
                            }}
                          />
                        </div>
                        <span
                          className={
                            isActive ? "font-semibold text-sm" : "text-sm"
                          }
                        >
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
                            style={{
                              color: isActive ? "#fff" : "var(--primary)",
                            }}
                          />
                        </div>
                        <span
                          className={
                            isActive ? "font-semibold text-sm" : "text-sm"
                          }
                        >
                          Liked
                        </span>
                      </>
                    )}
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        ) : (
          /* 2. Embedded Login Card Spanning Full Height */
          <div
            className="flex h-full w-full flex-col justify-between rounded-3xl p-6 shadow-[0_8px_25px_var(--wrap-shadow)] border transition-all duration-300"
            style={{
              backgroundColor: "var(--card-color)",
              borderColor: "var(--border-light)",
            }}
          >
            {/* Top / Form Container */}
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="text-center pt-2">
                <h3
                  className="text-base font-bold tracking-wide"
                  style={{ color: "var(--primary-color)" }}
                >
                  Welcome Back
                </h3>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--text-light)" }}
                >
                  Sign in to access your watchlist
                </p>
              </div>

              {/* Role Switcher Tabs */}
              <div
                className="flex rounded-2xl p-1 border"
                style={{
                  backgroundColor: "var(--primary-bg-light)",
                  borderColor: "var(--border-light)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveTab("user")}
                  className="flex-1 rounded-xl py-2 text-xs font-bold transition-all duration-200 cursor-pointer"
                  style={{
                    background:
                      activeTab === "user"
                        ? "var(--active-gradient)"
                        : "transparent",
                    color:
                      activeTab === "user"
                        ? "var(--primary-color)"
                        : "var(--text-light)",
                    boxShadow:
                      activeTab === "user"
                        ? "0 2px 6px var(--shadow-medium)"
                        : "none",
                  }}
                >
                  User
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("admin")}
                  className="flex-1 rounded-xl py-2 text-xs font-bold transition-all duration-200 cursor-pointer"
                  style={{
                    background:
                      activeTab === "admin"
                        ? "var(--active-gradient)"
                        : "transparent",
                    color:
                      activeTab === "admin"
                        ? "var(--primary-color)"
                        : "var(--text-light)",
                    boxShadow:
                      activeTab === "admin"
                        ? "0 2px 6px var(--shadow-medium)"
                        : "none",
                  }}
                >
                  Admin
                </button>
              </div>

              {/* Render Selected Form */}
              <div className="mt-2">
                {activeTab === "user" ? <UserLoginForm /> : <AdminLoginForm />}
              </div>
            </div>

            {/* Bottom Footer Note inside the card */}
            <div className="text-center pb-2">
              <p className="text-[11px]" style={{ color: "var(--text-light)" }}>
                Reko Movie Manager
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
