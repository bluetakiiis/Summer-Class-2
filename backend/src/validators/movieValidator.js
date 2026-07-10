// src/validators/movieValidator.js

const { body, validationResult } = require("express-validator");

// Validation rules for ALL fields
const movieValidationRules = [
  body("title").trim().notEmpty().withMessage("Movie title is required"),

  body("description").trim().notEmpty().withMessage("Description is required"),

  body("episodes")
    .trim()
    .notEmpty()
    .withMessage("Episodes field is required")
    .isNumeric()
    .withMessage("Episodes must be a number"),

  body("rating").trim().notEmpty().withMessage("Rating is required"),

  body("genres").notEmpty().withMessage("At least one genre is required"),

  body("image").trim().notEmpty().withMessage("Image URL is required"),

  body("imageMobile")
    .trim()
    .notEmpty()
    .withMessage("Mobile Image URL is required"),

  body("link").trim().notEmpty().withMessage("Watch link is required"),

  body("list")
    .trim()
    .notEmpty()
    .withMessage("List selection is required")
    .isIn(["watched", "watchlist"])
    .withMessage('List must be either "watched" or "watchlist"'),
];

// Middleware to catch validation errors and return them
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next(); 
  }

  return res.status(400).json({ errors: errors.array() });
};

module.exports = {
  movieRules: movieValidationRules,
  validate,
};
