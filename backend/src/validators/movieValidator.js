const { body, validationResult } = require("express-validator");

const movieValidationRules = [
  body("title").trim().notEmpty().withMessage("Movie title is required"),
  body("rating").trim().notEmpty().withMessage("Rating is required"),
  body("image").trim().notEmpty().withMessage("Image URL is required"),
];

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
