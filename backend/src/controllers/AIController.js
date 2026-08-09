const User = require("../models/UserModel");
const Movie = require("../models/Movie");
const { generateContent } = require("../services/GroqService");
const { getTMDBDetails } = require("../services/TMDBService");

// Helper to fetch and normalize metadata for a single item
const getItemDetails = async (item) => {
  try {
    if (item.source === "local") {
      const movie = await Movie.findById(item.movieId).select(
        "title genres rating description",
      );
      if (!movie) return null;

      const rawRating = parseFloat(movie.rating);
      return {
        title: movie.title,
        genres: movie.genres || [],
        rating: !isNaN(rawRating) ? rawRating.toFixed(1) : null,
        overview: movie.description ? movie.description.slice(0, 120) : "",
      };
    }

    if (item.source === "tmdb") {
      const movie = await getTMDBDetails(item.tmdbId, item.mediaType);
      if (!movie) return null;

      const genres = Array.isArray(movie.genres)
        ? movie.genres.map((g) => (typeof g === "object" ? g.name : g))
        : [];

      const rawRating = parseFloat(
        movie.vote_average ?? movie.voteAverage ?? movie.rating,
      );
      const rating = !isNaN(rawRating) ? rawRating.toFixed(1) : null;
      const overview = (movie.overview || movie.description || "").slice(
        0,
        120,
      );

      return {
        title: movie.title || movie.name,
        genres,
        rating,
        overview,
      };
    }
  } catch (error) {
    console.error(`Error fetching item details:`, error);
    return null;
  }
  return null;
};

// Fetch list metadata concurrently and limit to recent items
const fetchListDetails = async (items = [], limit = 8) => {
  const recentItems = items.slice(-limit);
  const results = await Promise.all(recentItems.map(getItemDetails));
  return results.filter(Boolean);
};

const formatMovieList = (movies) => {
  if (!movies || movies.length === 0) return "None";
  return movies
    .map((m) => {
      const genreStr =
        Array.isArray(m.genres) && m.genres.length > 0
          ? ` (${m.genres.join(", ")})`
          : "";
      const ratingStr = m.rating ? ` ★${m.rating}` : "";
      const overviewStr = m.overview ? ` - ${m.overview}` : "";

      return `- ${m.title}${genreStr}${ratingStr}${overviewStr}`;
    })
    .join("\n");
};

const generateMovieRecommendationPrompt = (
  likedMovies,
  watchlistMovies,
  watchedMovies,
  history,
  message,
) => {
  const recentHistory = history.slice(-8);
  const historyText =
    recentHistory.length > 0
      ? recentHistory
          .map(
            (m) =>
              `${
                m.sender === "user" || m.sender === "User"
                  ? "User"
                  : "Assistant"
              }: ${m.text}`,
          )
          .join("\n")
      : "No previous context.";

  return `
You are Reko AI, a friendly and intelligent movie & TV show recommendation assistant.

User Profile Data (FOR REFERENCE & EXCLUSIONS):

Favorite Titles:
${formatMovieList(likedMovies)}

Watchlist:
${formatMovieList(watchlistMovies)}

Previously Watched:
${formatMovieList(watchedMovies)}

Recent Conversation:
${historyText}

Current User Message:
${message}

CRITICAL INSTRUCTIONS:

STEP 1: DETERMINE USER INTENT

CASE A: SMALL TALK / GREETINGS
Trigger: "hi", "hello", "thanks", "okay", "cool", "how are you", etc.
- Respond with a brief, warm, natural reply.
- Ask what genre or vibe they feel like watching today.
- DO NOT list any recommendations.

CASE B: SPECIFIC GENRE / TOPIC REQUEST
Trigger: User asks for a specific genre, mood, actor, or type of show (e.g., "just horror", "action movies", "k-dramas", "funny comedies").
- Recommend EXACTLY 3 top titles matching their requested genre/topic.
- DO NOT mention their watch history, profile data, or say "based on your history of X". Simply recommend great titles in that requested genre!
- Still filter out titles in "Previously Watched" or "Watchlist".

CASE C: OPEN-ENDED / HISTORY-BASED RECOMMENDATION REQUEST
Trigger: User asks generally for recommendations based on their profile/history (e.g., "what should I watch?", "recommend based on my history", "anything else?").
- Recommend EXACTLY 3 titles tailored to their profile/history.
- Explain how each title fits their watch history and taste.

FORMATTING RULES FOR CASES B & C:
- Recommend EXACTLY 3 real, existing titles.
- DO NOT use asterisks (**), markdown bolding, or double quotes (") around titles.
- You MUST leave a blank line between every item.

EXACT LAYOUT FOR CASES B & C:

Here are 3 suggestions:

1. Title - Brief explanation of what it is about and why it is great.

2. Title - Brief explanation of what it is about and why it is great.

3. Title - Brief explanation of what it is about and why it is great.

Keep your response under 150 words.
`;
};

exports.chatWithAI = async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    // Select only needed array fields
    const user = await User.findById(req.user._id).select(
      "liked watchlist watched",
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Fetch details concurrently for all three lists
    const [likedMoviesInfo, watchlistMoviesInfo, watchedMoviesInfo] =
      await Promise.all([
        fetchListDetails(user.liked, 8),
        fetchListDetails(user.watchlist, 8),
        fetchListDetails(user.watched, 8),
      ]);

    const prompt = generateMovieRecommendationPrompt(
      likedMoviesInfo,
      watchlistMoviesInfo,
      watchedMoviesInfo,
      history,
      message,
    );

    const aiResponse = await generateContent(prompt);

    res.json({
      reply: aiResponse,
    });
  } catch (error) {
    console.error("Error in chatWithAI:", error);

    res.status(500).json({
      message: error.message || "Failed to process chat recommendation",
    });
  }
};
