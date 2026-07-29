import axios from "axios";

export async function importTMDBMovie(movie) {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:5000/movies/import",
    {
      tmdbId: movie.id,

      title: movie.name || movie.title,

      image: "https://image.tmdb.org/t/p/w780" + movie.poster_path,

      description: movie.overview,

      rating: movie.vote_average,

      totalEpisodes: movie.number_of_episodes || 999,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}
