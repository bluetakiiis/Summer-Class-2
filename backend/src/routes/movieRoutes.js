// src/routes/movieRoutes.js

const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

const { movieRules, validate } = require("../validators/movieValidator");

router.get("/", movieController.getAllMovies);
router.get("/:id", movieController.getMovieById);

router.post("/", movieRules, validate, movieController.createMovie);
router.put("/:id", movieRules, validate, movieController.updateMovie);

router.delete("/:id", movieController.deleteMovie);

module.exports = router;
