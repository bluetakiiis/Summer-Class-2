// src/controllers/movieController.js

const Movie = require("../models/Movie");

// GET /movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /movies/:id
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// POST /movies
exports.createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// PUT /movies/:id
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(200).json(movie);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// DELETE /movies/:id
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
