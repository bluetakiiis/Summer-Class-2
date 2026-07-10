// src/models/movieModel.js

let Movies = [
  {
    id: "1",
    title: "Absolute Value of Romance",
    description: "A quiet student by day, a romance novelist by night, Eui-ju is inspired when four gorgeous teachers appear.",
    episodes: "16",
    rating: "8/10",
    genres: ["Comedy", "Youth", "Drama"],
    image: "https://m.media-amazon.com/images/M/MV5BMjA0Zjg5ZWQtMDcyYi00ZTA2LTliNTItNDhkNWY0NTZlZWNjXkEyXkFqcGc@._V1_FMjpg_UX1080_.jpg",
    imageMobile: "https://m.media-amazon.com/images/M/MV5BMjA0Zjg5ZWQtMDcyYi00ZTA2LTliNTItNDhkNWY0NTZlZWNjXkEyXkFqcGc@._V1_FMjpg_UX1080_.jpg",
    link: "https://kisskh.co/",
    liked: false,
    list: "watched",
  },
  {
    id: "2",
    title: "Train to Busan",
    description: "As a zombie outbreak sweeps the country, a dad and his daughter take a harrowing train journey in an attempt to reach the only city that's still safe.",
    episodes: "1",
    rating: "8/10",
    genres: ["Thriller", "Horror"],
    image: "https://c8.alamy.com/comp/R2HJ0M/busanhaeng-train-to-busan-year-2016-south-korea-director-sang-ho-yeon-movie-poster-R2HJ0M.jpg",
    imageMobile: "https://m.media-amazon.com/images/M/MV5BMjA0Zjg5ZWQtMDcyYi00ZTA2LTliNTItNDhkNWY0NTZlZWNjXkEyXkFqcGc@._V1_FMjpg_UX1080_.jpg",
    link: "https://kisskh.co/",
    liked: true,
    list: "watchlist",
  },
];

let nextId = 3;

// Exporting data helper methods
module.exports = {
  getAll: () => Movies,
  
  getById: (id) => Movies.find(m => m.id === id),
  
  create: (movieData) => {
    const newMovie = {
      id: nextId.toString(),
      ...movieData,
      liked: false,
    };
    Movies.push(newMovie);
    nextId++;
    return newMovie;
  },

  update: (id, updates) => {
    const movie = Movies.find(m => m.id === id);
    if (!movie) return null;
    
    // Update fields if they are provided
    if (updates.title !== undefined) movie.title = updates.title;
    if (updates.description !== undefined) movie.description = updates.description;
    if (updates.episodes !== undefined) movie.episodes = updates.episodes;
    if (updates.rating !== undefined) movie.rating = updates.rating;
    if (updates.genres !== undefined) movie.genres = updates.genres;
    if (updates.image !== undefined) movie.image = updates.image;
    if (updates.imageMobile !== undefined) movie.imageMobile = updates.imageMobile;
    if (updates.link !== undefined) movie.link = updates.link;
    if (updates.liked !== undefined) movie.liked = updates.liked;
    if (updates.list !== undefined) movie.list = updates.list;

    return movie;
  },

  delete: (id) => {
    const index = Movies.findIndex(m => m.id === id);
    if (index === -1) return false;
    Movies.splice(index, 1);
    return true;
  }
};