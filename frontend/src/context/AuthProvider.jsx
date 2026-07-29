import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const USER_API = "http://localhost:5000/users";

export default function AuthProvider({ children }) {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  // keep React state and localStorage strictly in sync
  const setUser = (userData) => {
    setUserState(userData);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  };

  // clear authentication session
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserState(null);
  };

  // fetch complete user profile data
  const loadUserProfile = async (userId) => {
    const token = localStorage.getItem("token");

    console.log("Loading user:", userId);
    console.log("Token:", token);

    const response = await axios.get(`${USER_API}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Backend returned:", response.data);

    return response.data;
  };

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get("token");
        const urlUser = params.get("user");

        let parsedUser = null;

        // Path 1: Google OAuth Callback
        if (urlToken && urlUser) {
          localStorage.setItem("token", urlToken);
          parsedUser = JSON.parse(urlUser);

          // Clean up URL query params from browser bar
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
        } else {
          // Path 2: Email Login / Existing Session Restore
          const storedUser = localStorage.getItem("user");
          const storedToken = localStorage.getItem("token");

          if (!storedUser || !storedToken) {
            setLoading(false);
            return;
          }

          parsedUser = JSON.parse(storedUser);
        }

        // Unified convergence point for both Google and Email authentication
        const userId = parsedUser?._id || parsedUser?.id;

        if (userId) {
          const fullUser = await loadUserProfile(userId);
          if (fullUser) {
            setUser(fullUser);
          }
        }
      } catch (err) {
        console.error("Error restoring authentication session:", err);
        // Clear invalid or expired credentials
        logout();
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
