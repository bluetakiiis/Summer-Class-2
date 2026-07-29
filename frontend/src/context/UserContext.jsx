import { createContext, useState } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(
        "Error fetching users:",
        err.response?.data?.message || err.message,
      );
    } finally {
      setUsersLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        fetchUsers,
        usersLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
