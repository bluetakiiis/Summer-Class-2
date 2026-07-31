import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/auth`;

// Helper function to normalize user object, enforcing MongoDB '_id' format
const normalizeUser = (user) => {
  if (!user) return null;

  const { _id, ...rest } = user;
  return {
    _id: _id,
    ...rest,
  };
};

// 1. Backend API Login (Email + Password)
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    if (response.data.user) {
      const formattedUser = normalizeUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(formattedUser));
      response.data.user = formattedUser;
    }

    return response.data;
  } catch (error) {
    console.error("Login User Error:", error.response?.data || error.message);
    throw error;
  }
};

// 2. Backend API Register
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Register Error:", error.response?.data || error.message);
    throw error;
  }
};

// 3. Admin Login (backend JWT, separate endpoint from user login)
export const adminLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/admin/login`, {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    if (response.data.user) {
      const formattedUser = normalizeUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(formattedUser));
      response.data.user = formattedUser;
    }

    return response.data;
  } catch (error) {
    console.error("Admin Login Error:", error.response?.data || error.message);
    throw error;
  }
};

// 4. Google Login - redirects browser to the backend's Passport route
export const googleLoginUrl = `${API_URL}/google`;

// 5. Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
