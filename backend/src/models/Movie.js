const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    episodes: {
      type: Number,
    },

    rating: {
      type: String,
    },

    genres: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
    },

    imageMobile: {
      type: String,
    },

    link: {
      type: String,
    },

    liked: {
      type: Boolean,
      default: false,
    },

    list: {
      type: String,
      default: "watchlist",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Movie", movieSchema);
