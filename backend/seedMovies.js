require("dotenv").config();
const connectDB = require("./config/db");
const Movie = require("./src/models/Movie");

const initialMovies = [
  {
    title: "Goblin",
    description:
      "An immortal goblin searches for his human bride to end his cursed immortality.",
    rating: "8.8",
    genres: ["Fantasy", "Romance", "Drama"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
    link: "/play/series/1",
    mediaType: "series",
    totalEpisodes: 16,
    episodes: [
      {
        title: "Episode 1",
        seasonNumber: 1,
        episodeNumber: 1,
        videoUrl: "",
      },
    ],
  },
  {
    title: "Parasite",
    description:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the Park family and the Kim clan.",
    rating: "8.6",
    genres: ["Thriller", "Drama"],
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
    link: "/play/movie/2",
    mediaType: "movie",
    totalEpisodes: 1,
    episodes: [
      {
        title: "Full Movie",
        seasonNumber: 1,
        episodeNumber: 1,
        videoUrl: "",
      },
    ],
  },
];

const seedDB = async () => {
  try {
    await connectDB();
    await Movie.deleteMany({}); // Clears existing movies in MongoDB
    await Movie.insertMany(initialMovies);
    console.log("🎬 Movies seeded successfully into MongoDB!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding movies:", error);
    process.exit(1);
  }
};

seedDB();
