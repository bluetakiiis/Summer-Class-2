// src/controllers/movieController.js

const MovieModel = require('../models/movieModel');

// GET /movies
exports.getAllMovies = (req, res) => {
  const movies = MovieModel.getAll();
  res.status(200).json(movies);
};

// GET /movies/:id
exports.getMovieById = (req, res) => {
  const id = req.params.id; 
  const movie = MovieModel.getById(id);
  
  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  res.status(200).json(movie);
};

// POST /movies
exports.createMovie = (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ message: 'Movie title is required' });
  }
  
  const newMovie = MovieModel.create(req.body);
  res.status(201).json(newMovie);
};

// PUT /movies/:id
exports.updateMovie = (req, res) => {
  const id = req.params.id;
  const updatedMovie = MovieModel.update(id, req.body);
  
  if (!updatedMovie) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  res.status(200).json(updatedMovie);
};

// DELETE /movies/:id
exports.deleteMovie = (req, res) => {
  const id = req.params.id;
  const success = MovieModel.delete(id);
  
  if (!success) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  res.status(204).send(); 
};