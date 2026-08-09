# AI Agent Guidelines

## Project

Movie Recommendation & Tracking System

A full-stack MERN application that allows users to discover, track, and manage movies. The application supports authentication, AI-powered movie recommendations, TMDB integration, and an admin dashboard for managing content.

---

## Technology Stack

### Frontend

- React (Vite)
- React Router
- Axios
- Context API
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js
- JWT Authentication
- Groq AI API
- TMDB API

---

## Project Structure

### Frontend

- `src/components`
  - `ai`
  - `auth`
  - `cards`
  - `common`
  - `forms`
  - `movies`
  - `ui`

- `src/context`
- `src/pages`
- `src/layouts`
- `src/services`
- `src/hooks`
- `src/data`

### Backend

- `config`
- `src/config`
- `src/controllers`
- `src/middlewares`
- `src/models`
- `src/routes`
- `src/services`
- `src/validators`

---

## Coding Standards

- Use modern ES6+ JavaScript.
- Use async/await for asynchronous operations.
- Keep controllers focused on request handling.
- Move reusable logic into services or helper functions.
- Follow RESTful API conventions.
- Return consistent JSON responses.
- Handle errors with try/catch.
- Avoid duplicated code.
- Use descriptive variable and function names.
- Keep components small and reusable.

---

## Frontend Guidelines

- Use functional React components.
- Use React Context for shared state.
- Reuse existing UI components whenever possible.
- Keep business logic out of components when appropriate.
- Maintain the existing folder structure.

---

## Backend Guidelines

- Keep routes thin.
- Perform business logic inside controllers or services.
- Validate request data before processing.
- Use Mongoose models for database operations.
- Keep TMDB and Groq API logic inside the `services` folder.
- Do not hardcode API keys or secrets.

---

## AI Features

- AI recommendations are handled through `GroqService.js`.
- Movie metadata is retrieved through `TMDBService.js`.
- Never recommend movies already in the user's watched or watchlist collections.
- Preserve existing AI prompt structure unless explicitly asked to modify it.

---

## Expectations

Before making any changes:

1. Explain which files will be modified.
2. Explain why the changes are needed.
3. Do not modify unrelated files.
4. Preserve existing functionality.
5. Keep code beginner-friendly and readable.
6. Minimize breaking changes.
7. Follow the current project architecture.
8. Ask for approval before large refactors.
