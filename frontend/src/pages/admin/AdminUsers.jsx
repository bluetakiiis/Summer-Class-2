import { useEffect, useState } from "react";
import axios from "axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Filter out admin users
  const nonAdminUsers = users.filter(
    (user) => user.role !== "admin" && !user.isAdmin,
  );

  return (
    <div className="w-full">
      <h1 className="mb-6 text-3xl font-bold" style={{ color: "var(--text)" }}>
        Users
      </h1>

      <div
        className="w-full overflow-hidden rounded-2xl shadow-xl border border-white/10 transition-all duration-300"
        style={{ backgroundColor: "var(--card-color)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            {/* Table Header */}
            <thead>
              <tr
                className="border-b text-xs font-semibold uppercase tracking-wider"
                style={{
                  backgroundColor: "var(--primary-bg-light)",
                  borderColor: "rgba(255, 255, 255, 0.08)",
                  color: "var(--text-color)",
                }}
              >
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 text-center">Liked</th>
                <th className="px-6 py-4 text-center">Watchlist</th>
                <th className="px-6 py-4 text-center">Watched</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody
              className="divide-y"
              style={{ borderColor: "rgba(255, 255, 255, 0.05)" }}
            >
              {loading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-sm font-medium"
                    style={{ color: "var(--text-color)" }}
                  >
                    Fetching users...
                  </td>
                </tr>
              ) : nonAdminUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-sm font-medium opacity-60"
                    style={{ color: "var(--text-color)" }}
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                nonAdminUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="transition-colors duration-150 hover:bg-white/5"
                  >
                    {/* Email Column */}
                    <td
                      className="px-6 py-4 font-medium"
                      style={{ color: "var(--text-color)" }}
                    >
                      {user.email}
                    </td>

                    {/* Liked Count Badge */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className="inline-flex min-w-8 items-center justify-center rounded-full px-3 py-1 text-xs font-bold text-white shadow-xs"
                        style={{ backgroundColor: "var(--primary)" }}
                      >
                        {user.liked?.length || 0}
                      </span>
                    </td>

                    {/* Watchlist Count Badge */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className="inline-flex min-w-8 items-center justify-center rounded-full px-3 py-1 text-xs font-bold text-white shadow-xs"
                        style={{ backgroundColor: "var(--primary)" }}
                      >
                        {user.watchlist?.length || 0}
                      </span>
                    </td>

                    {/* Watched Count Badge */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className="inline-flex min-w-8 items-center justify-center rounded-full px-3 py-1 text-xs font-bold text-white shadow-xs"
                        style={{ backgroundColor: "var(--primary)" }}
                      >
                        {user.watched?.length || 0}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
