const User = require("../models/UserModel");

// GET CURRENT USER
exports.getCurrentUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .select("-password")
      .populate("liked.movieId")
      .populate("watchlist.movieId")
      .populate("watched.movieId");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Error fetching user",
    });
  }
};

// GET ALL USERS (Admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .populate("liked.movieId")
      .populate("watchlist.movieId")
      .populate("watched.movieId");

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching users",
    });
  }
};

// TOGGLE LIKE
exports.toggleLike = async (req, res) => {
  try {
    const { source, movieId, tmdbId, mediaType } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const index = user.liked.findIndex((item) => {
      if (source === "local") {
        return (
          item.source === "local" && String(item.movieId) === String(movieId)
        );
      }

      return (
        item.source === "tmdb" &&
        Number(item.tmdbId) === Number(tmdbId) &&
        item.mediaType === mediaType
      );
    });

    if (index >= 0) {
      user.liked.splice(index, 1);
    } else {
      user.liked.push({
        source,
        movieId,
        tmdbId,
        mediaType,
      });
    }

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// TOGGLE WATCHLIST
exports.toggleWatchlist = async (req, res) => {
  try {
    const { source, movieId, tmdbId, mediaType } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const index = user.watchlist.findIndex((item) => {
      if (source === "local") {
        return (
          item.source === "local" && String(item.movieId) === String(movieId)
        );
      }

      return (
        item.source === "tmdb" &&
        Number(item.tmdbId) === Number(tmdbId) &&
        item.mediaType === mediaType
      );
    });

    if (index >= 0) {
      user.watchlist.splice(index, 1);
    } else {
      user.watchlist.push({
        source,
        movieId,
        tmdbId,
        mediaType,
      });
    }

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// TOGGLE WATCHED
exports.toggleWatched = async (req, res) => {
  try {
    const { source, movieId, tmdbId, mediaType } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const index = user.watched.findIndex((item) => {
      if (source === "local") {
        return (
          item.source === "local" && String(item.movieId) === String(movieId)
        );
      }

      return (
        item.source === "tmdb" &&
        Number(item.tmdbId) === Number(tmdbId) &&
        item.mediaType === mediaType
      );
    });

    if (index >= 0) {
      user.watched.splice(index, 1);
    } else {
      user.watched.push({
        source,
        movieId,
        tmdbId,
        mediaType,
      });
    }

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
