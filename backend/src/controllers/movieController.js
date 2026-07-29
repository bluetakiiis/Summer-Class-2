const mongoose = require("mongoose");
const Movie = require("../models/Movie");

// GET /movies (Public)
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({
      $or: [{ source: "local" }, { source: { $exists: false } }],
    }).sort({ createdAt: -1 });
    res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// GET /movies/:id (Public - Supports MongoDB _id and TMDB tmdbId)
exports.getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    let movie = null;

    // 1. Search by MongoDB ObjectId if valid
    if (mongoose.Types.ObjectId.isValid(id)) {
      movie = await Movie.findById(id);
    }

    // 2. Fallback search by tmdbId if format matches "tmdb-123" or numeric ID
    if (!movie) {
      const tmdbId = Number(id.replace("tmdb-", ""));
      if (!isNaN(tmdbId)) {
        movie = await Movie.findOne({ tmdbId });
      }
    }

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// POST /movies (Admin Only)
exports.createMovie = async (req, res) => {
  try {
    const movieData = {
      ...req.body,
      totalEpisodes:
        Array.isArray(req.body.episodes) && req.body.episodes.length > 0
          ? req.body.episodes.length
          : req.body.totalEpisodes || 1,
    };

    const movie = await Movie.create(movieData);
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /movies/:id (Admin Only)
exports.updateMovie = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.episodes && Array.isArray(updateData.episodes)) {
      updateData.totalEpisodes = updateData.episodes.length;
    }

    const movie = await Movie.findByIdAndUpdate(req.params.id, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /movies/:id (Admin Only)
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// IMPORT TMDB MOVIE
exports.importTMDBMovie = async (req, res) => {
  try {
    const {
      tmdbId,
      title,
      image,
      description,
      rating,
      totalEpisodes,
      mediaType,
    } = req.body;

    // Check if already imported
    let movie = await Movie.findOne({ tmdbId });

    if (movie) {
      return res.status(200).json(movie);
    }

    // Create new movie
    movie = await Movie.create({
      tmdbId,
      title,
      image,
      description,
      rating,
      totalEpisodes,
      mediaType,
      source: "tmdb",
    });

    res.status(201).json(movie);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};
