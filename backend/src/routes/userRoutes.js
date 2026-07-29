const express = require("express");

const router = express.Router();

const { verifyToken, isAdmin } = require("../middlewares/VerifyToken");

const {
  getCurrentUser,
  getAllUsers,
  toggleLike,
  toggleWatchlist,
  toggleWatched,
  deleteUser,
} = require("../controllers/userController");

// Get all users (Admin)
router.get("/", verifyToken, isAdmin, getAllUsers);

// Get current user
router.get("/:userId", verifyToken, getCurrentUser);

// Toggle Like
router.put("/like", verifyToken, toggleLike);

// Toggle Watchlist
router.put("/watchlist", verifyToken, toggleWatchlist);

// Toggle Watched
router.put("/watched", verifyToken, toggleWatched);

// Delete User
router.delete("/:id", verifyToken, isAdmin, deleteUser);

module.exports = router;
