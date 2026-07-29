require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");

require("./src/config/passport"); 
const connectDB = require("./config/db");

// Route imports
const authRoutes = require("./src/routes/authRoutes");
const movieRoutes = require("./src/routes/movieRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Mounted Routes
app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("/users", userRoutes);

// Connect Database & Start Server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

startServer();
