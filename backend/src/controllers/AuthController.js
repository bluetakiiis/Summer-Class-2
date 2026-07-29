const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// --- 1. REGISTER USER ---
const registerUser = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    confirm_password,
    accept_terms,
  } = req.body;

  if (!first_name || !last_name || !email || !password || !confirm_password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  if (!accept_terms) {
    return res
      .status(400)
      .json({ message: "You must accept the terms and conditions" });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: "user",
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// --- 2. LOGIN USER ---
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await UserModel.findOne({ email })
      .populate("liked")
      .populate("watchlist")
      .populate("watched");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.password) {
      return res.status(400).json({
        message: "Please log in using Google for this account.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        liked: user.liked,
        watchlist: user.watchlist,
        watched: user.watched,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// --- 3. LOGIN ADMIN (separate endpoint, only matches role: 'admin') ---
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await UserModel.findOne({ email, role: "admin" })
      .populate("liked")
      .populate("watchlist")
      .populate("watched");

    if (!user) {
      return res.status(400).json({ message: "Invalid admin credentials" });
    }

    if (!user.password) {
      return res.status(400).json({
        message: "This admin account has no password set.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid admin credentials" });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({
      message: "Admin login successful",
      token,
      user: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        liked: user.liked,
        watchlist: user.watchlist,
        watched: user.watched,
      },
    });
  } catch (error) {
    console.error("Error logging in admin:", error.message);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  loginAdmin,
};
