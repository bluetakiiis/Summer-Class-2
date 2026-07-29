import { useState } from "react";
import { registerUser } from "../../services/auth";

function RegisterForm({ switchToLogin }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    accept_terms: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await registerUser(formData);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => switchToLogin(), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2.5 py-1 min-h-55">
      {/* --- Error Alert --- */}
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

      {/* --- Success Alert --- */}
      {success && (
        <div
          className="w-full rounded-xl p-2 text-center text-[11px]"
          style={{
            backgroundColor: "rgba(0, 200, 83, 0.08)",
            color: "#00c853",
            border: "1px solid rgba(0, 200, 83, 0.25)",
          }}
        >
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
        {/* Name Fields Row */}
        <div className="flex gap-2">
          <div className="flex flex-col gap-1 w-1/2">
            <label
              className="text-[10px] font-bold uppercase tracking-wider"
              style={{ color: "var(--text-light)" }}
            >
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              required
              value={formData.first_name}
              onChange={handleChange}
              placeholder="John"
              className="w-full rounded-xl px-3 py-2 text-xs outline-none transition-all"
              style={{
                backgroundColor: "var(--card-color)",
                color: "var(--text-color)",
                border: "1px solid var(--border-light)",
              }}
            />
          </div>

          <div className="flex flex-col gap-1 w-1/2">
            <label
              className="text-[10px] font-bold uppercase tracking-wider"
              style={{ color: "var(--text-light)" }}
            >
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              required
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Doe"
              className="w-full rounded-xl px-3 py-2 text-xs outline-none transition-all"
              style={{
                backgroundColor: "var(--card-color)",
                color: "var(--text-color)",
                border: "1px solid var(--border-light)",
              }}
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-1">
          <label
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: "var(--text-light)" }}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="user@example.com"
            className="w-full rounded-xl px-3 py-2 text-xs outline-none transition-all"
            style={{
              backgroundColor: "var(--card-color)",
              color: "var(--text-color)",
              border: "1px solid var(--border-light)",
            }}
          />
        </div>

        {/* Password Fields */}
        <div className="flex flex-col gap-1">
          <label
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: "var(--text-light)" }}
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
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
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm_password"
            required
            value={formData.confirm_password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full rounded-xl px-3 py-2 text-xs outline-none transition-all"
            style={{
              backgroundColor: "var(--card-color)",
              color: "var(--text-color)",
              border: "1px solid var(--border-light)",
            }}
          />
        </div>

        {/* Checkbox */}
        <label
          className="flex items-center gap-2 text-[10px] cursor-pointer my-0.5"
          style={{ color: "var(--text-light)" }}
        >
          <input
            type="checkbox"
            name="accept_terms"
            checked={formData.accept_terms}
            onChange={handleChange}
            required
            className="accent-blue-500 rounded"
          />
          <span>I accept the terms and conditions</span>
        </label>

        {/* Register Button */}
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
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>

      {/* Switch to Login Text */}
      <div
        className="mt-1 text-center text-xs"
        style={{ color: "var(--text-light)" }}
      >
        Already have an account?{" "}
        <button
          type="button"
          onClick={switchToLogin}
          className="font-bold underline cursor-pointer hover:opacity-80"
          style={{ color: "var(--text-color)" }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default RegisterForm;
