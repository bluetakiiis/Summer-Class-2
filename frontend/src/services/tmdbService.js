import axios from "axios";

const API = import.meta.env.VITE_TMDB_API_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const getTrending = async (isBlueTheme) => {
  const endpoint = isBlueTheme ? "/trending/movie/week" : "/trending/tv/week";

  const res = await axios.get(`${API}${endpoint}`, {
    params: {
      api_key: API_KEY,
    },
  });

  return res.data.results.map((item) => ({
    ...item,
    _id: `tmdb-${item.id}`,
    title: item.title || item.name,
    image: `https://image.tmdb.org/t/p/w780${item.poster_path}`,
    totalEpisodes: isBlueTheme ? 1 : 2,
    liked: false,
    watchlist: false,
    watched: false,
  }));
};

export const getPopular = async (isBlueTheme) => {
  const endpoint = isBlueTheme ? "/movie/popular" : "/tv/popular";

  const res = await axios.get(`${API}${endpoint}`, {
    params: {
      api_key: API_KEY,
    },
  });

  return res.data.results.map((item) => ({
    ...item,
    _id: `tmdb-${item.id}`,
    title: item.title || item.name,
    image: `https://image.tmdb.org/t/p/w780${item.poster_path}`,
    totalEpisodes: isBlueTheme ? 1 : 2,
    liked: false,
    watchlist: false,
    watched: false,
  }));
};

export const getTopRated = async (isBlueTheme) => {
  const endpoint = isBlueTheme ? "/movie/top_rated" : "/tv/top_rated";

  const res = await axios.get(`${API}${endpoint}`, {
    params: {
      api_key: API_KEY,
    },
  });

  return res.data.results.map((item) => ({
    ...item,
    _id: `tmdb-${item.id}`,
    title: item.title || item.name,
    image: `https://image.tmdb.org/t/p/w780${item.poster_path}`,
    totalEpisodes: isBlueTheme ? 1 : 2,
    liked: false,
    watchlist: false,
    watched: false,
  }));
};

export const searchShows = async (query, isBlueTheme) => {
  const endpoint = isBlueTheme ? "/search/movie" : "/search/tv";

  const res = await axios.get(`${API}${endpoint}`, {
    params: {
      api_key: API_KEY,
      query,
    },
  });

  return res.data.results.map((item) => ({
    ...item,
    _id: `tmdb-${item.id}`,
    title: item.title || item.name,
    image: `https://image.tmdb.org/t/p/w780${item.poster_path}`,
    totalEpisodes: isBlueTheme ? 1 : 2,
    liked: false,
    watchlist: false,
    watched: false,
  }));
};

export const getTMDBDetails = async (tmdbId, isBlueTheme) => {
  const endpoint = isBlueTheme ? `/movie/${tmdbId}` : `/tv/${tmdbId}`;

  const res = await axios.get(`${API}${endpoint}`, {
    params: {
      api_key: API_KEY,
    },
  });

  const item = res.data;

  return {
    ...item,
    _id: `tmdb-${item.id}`,
    title: item.title || item.name,
    image: item.poster_path
      ? `https://image.tmdb.org/t/p/w780${item.poster_path}`
      : "",
    totalEpisodes: item.number_of_episodes || 1,
    liked: false,
    watchlist: false,
    watched: false,
  };
};
