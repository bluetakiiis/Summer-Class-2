import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, googleLoginUrl } from "../../services/auth";
import { AuthContext } from "../../context/AuthContext";
import RegisterForm from "./RegisterForm";

function UserLoginForm({ onSuccess }) {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext) || {};

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isRegistering) {
    return <RegisterForm switchToLogin={() => setIsRegistering(false)} />;
  }

  // Helper to handle successful auth
  const handleAuthSuccess = (responseData) => {
    // 1. Save Token and User Data to localStorage
    if (responseData?.token) {
      localStorage.setItem("token", responseData.token);
    }
    if (responseData?.user) {
      localStorage.setItem("user", JSON.stringify(responseData.user));
      if (setUser) setUser(responseData.user);
    }

    // 2. Trigger parent callbacks if passed
    if (onSuccess) onSuccess(responseData);

    // 3. Redirect user based on role
    const userRole = responseData?.user?.role;
    if (userRole === "admin") {
      navigate("/admin/users");
    } else {
      navigate("/");
    }
  };

  // Handle Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser(email, password);
      handleAuthSuccess(response);
    } catch (err) {
      console.error("User login failed:", err);
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2.5 py-1 min-h-55">
      {error && (
        <div
          className="w-full rounded-xl p-2 text-center text-[11px]"
          style={{
            backgroundColor: "rgba(255, 0, 0, 0.05)",
            color: "#d93025",
            border: "1px solid rgba(255, 0, 0, 0.2)",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-1">
          <label
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: "var(--text-light)" }}
          >
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            className="w-full rounded-xl px-3 py-2 text-xs outline-none transition-all"
            style={{
              backgroundColor: "var(--card-color)",
              color: "var(--text-color)",
              border: "1px solid var(--border-light)",
            }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: "var(--text-light)" }}
          >
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl px-3 py-2 text-xs outline-none transition-all"
            style={{
              backgroundColor: "var(--card-color)",
              color: "var(--text-color)",
              border: "1px solid var(--border-light)",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-1 flex h-9 w-full cursor-pointer items-center justify-center rounded-xl text-xs font-bold shadow-xs transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
          style={{
            background: "var(--active-gradient)",
            color: "var(--primary-color)",
            border: "1px solid var(--border-light)",
          }}
        >
          {loading ? "Authenticating..." : "Login"}
        </button>
      </form>

      {/* --- Divider --- */}
      <div className="relative my-0.5 flex items-center justify-center">
        <div
          className="w-full border-t"
          style={{ borderColor: "var(--border-light)" }}
        ></div>
        <span
          className="absolute px-2 text-[9px] font-semibold uppercase tracking-wider"
          style={{
            backgroundColor: "var(--card-color)",
            color: "var(--text-light)",
          }}
        >
          or
        </span>
      </div>

      {/* --- Google OAuth Link ---
          Sends the browser straight to the backend's Passport route.
          Backend handles the Google consent screen and redirects back
          to this app with ?token=&user= in the URL. */}
      <a
        href={googleLoginUrl}
        className="flex h-9 w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold shadow-sm transition-all hover:opacity-85 active:scale-95"
        style={{
          backgroundColor: "var(--card-color)",
          color: "var(--text-color)",
          border: "1px solid var(--border-light)",
        }}
      >
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Continue with Google</span>
      </a>

      {/* --- Switch to Register --- */}
      <div
        className="mt-1 text-center text-xs"
        style={{ color: "var(--text-light)" }}
      >
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => setIsRegistering(true)}
          className="font-bold underline cursor-pointer hover:opacity-80"
          style={{ color: "var(--text-color)" }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default UserLoginForm;
