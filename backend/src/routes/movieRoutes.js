const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const { movieRules, validate } = require("../validators/movieValidator");
const { verifyToken, isAdmin } = require("../middlewares/VerifyToken");

// Public endpoints
router.get("/", movieController.getAllMovies);
router.get("/:id", movieController.getMovieById);

// Protected endpoints
router.post("/import", verifyToken, movieController.importTMDBMovie);

router.post(
  "/",
  verifyToken,
  isAdmin,
  movieRules,
  validate,
  movieController.createMovie,
);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  movieRules,
  validate,
  movieController.updateMovie,
);

router.delete("/:id", verifyToken, isAdmin, movieController.deleteMovie);

module.exports = router;
