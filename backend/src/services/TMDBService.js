const axios = require("axios");

const API = process.env.TMDB_API_URL;
const API_KEY = process.env.TMDB_API_KEY;

async function getTMDBDetails(tmdbId, mediaType = "movie") {
  const endpoint = mediaType === "movie" ? `/movie/${tmdbId}` : `/tv/${tmdbId}`;

  const res = await axios.get(`${API}${endpoint}`, {
    params: {
      api_key: API_KEY,
    },
  });

  const item = res.data;

  return {
    title: item.title || item.name,
    genres: item.genres.map((g) => g.name),
    rating: item.vote_average,
    description: item.overview,
  };
}

module.exports = {
  getTMDBDetails,
};
