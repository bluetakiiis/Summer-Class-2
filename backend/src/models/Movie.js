const mongoose = require("mongoose");

const episodeSchema = new mongoose.Schema(
  {
    title: String,
    seasonNumber: Number,
    episodeNumber: Number,
  },
  { _id: false },
);

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

    rating: {
      type: String,
      default: "",
    },

    genres: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "",
    },

    mediaType: {
      type: String,
      enum: ["movie", "series"],
      default: "movie",
    },

    episodes: {
      type: [episodeSchema],
      default: [],
    },

    totalEpisodes: {
      type: Number,
      default: 1,
    },

    // TMDB Integration
    tmdbId: {
      type: Number,
      unique: true,
      sparse: true,
    },

    source: {
      type: String,
      default: "local",
    },

    // Admin recommendation section
    isFeatured: {
      type: Boolean,
      default: false,
    },

    isAdminRecommended: {
      type: Boolean,
      default: false,
    },

    recommendedByAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Movie", movieSchema, "movies");
