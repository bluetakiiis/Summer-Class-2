const express = require("express");
const cors = require("cors");

const movieRoutes = require("./routes/movieRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/movies", movieRoutes);

module.exports = app;
