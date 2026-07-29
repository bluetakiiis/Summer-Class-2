import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../services/auth";
import { AuthContext } from "../../context/AuthContext";

function AdminLoginForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext) || {};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await adminLogin(email, password);
      if (setUser) setUser(response.user);
      navigate("/admin");
    } catch (err) {
      console.error("Admin login failed:", err);
      setError(err.response?.data?.message || "Invalid admin credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2.5 py-1 min-h-55">
      {error ? (
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
      ) : null}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-1">
          <label
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: "var(--text-light)" }}
          >
            Admin Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
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
          {loading ? "Authenticating..." : "Login as Admin"}
        </button>
      </form>
    </div>
  );
}

export default AdminLoginForm;
