import { useContext, useEffect, useState } from "react";
import { TMDBContext } from "./TMDBContext";

import { MovieContext } from "./MovieContext";
import {
  getTrending,
  getPopular,
  getTopRated,
  searchShows,
} from "../services/tmdbService";

export default function TMDBProvider({ children }) {
  const { isBlueTheme } = useContext(MovieContext);

  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    let ignore = false;

    const fetchAllData = async () => {
      try {
        const [trendingData, popularData, topRatedData] = await Promise.all([
          getTrending(isBlueTheme),
          getPopular(isBlueTheme),
          getTopRated(isBlueTheme),
        ]);

        console.log("Trending", trendingData);
        console.log("Popular", popularData);
        console.log("Top Rated", topRatedData);

        if (!ignore) {
          setTrending(trendingData || []);
          setPopular(popularData || []);
          setTopRated(topRatedData || []);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllData();

    return () => {
      ignore = true;
    };
  }, [isBlueTheme]);

  async function search(query) {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const results = await searchShows(query, isBlueTheme);
      setSearchResults(results || []);
    } catch (err) {
      console.error("Error searching TMDB shows:", err);
    }
  }

  return (
    <TMDBContext.Provider
      value={{
        trending,
        popular,
        topRated,
        searchResults,
        search,
      }}
    >
      {children}
    </TMDBContext.Provider>
  );
}
