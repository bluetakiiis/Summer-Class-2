const mongoose = require("mongoose");

const savedItemSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      enum: ["local", "tmdb"],
      required: true,
    },

    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },

    tmdbId: {
      type: Number,
    },

    mediaType: {
      type: String,
      enum: ["movie", "tv"],
    },
  },
  { _id: false },
);

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    last_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: false,
    },

    googleId: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // USER'S PERSONAL LISTS
    liked: {
      type: [savedItemSchema],
      default: [],
    },

    watchlist: {
      type: [savedItemSchema],
      default: [],
    },

    watched: {
      type: [savedItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", UserSchema);
