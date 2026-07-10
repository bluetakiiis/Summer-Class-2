// src/app.js

const express = require("express");
const movieRoutes = require("./routes/movieRoutes");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Mount the movie routes at the /movies prefix
app.use("/movies", movieRoutes);

// Export the configured app
module.exports = app;
