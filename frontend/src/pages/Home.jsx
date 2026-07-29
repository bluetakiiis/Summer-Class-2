import { useContext } from "react";
import MovieGrid from "../components/movies/MovieGrid";
import { TMDBContext } from "../context/TMDBContext";

function Home({ adminRecommendedShows = [], currentFilteredMovies = [] }) {
  const {
    trending = [],
    popular = [],
    topRated = [],
    searchResults = [],
  } = useContext(TMDBContext) || {};

  const isSearching = searchResults.length > 0;

  return (
    <div className="flex flex-col gap-10">
      {/* Dynamic Search Results takeover when typing */}
      {isSearching ? (
        <section>
          <h2
            className="mb-4 text-xl font-bold tracking-wide"
            style={{ color: "var(--primary)" }}
          >
            Search Results
          </h2>
          <MovieGrid movies={searchResults} />
        </section>
      ) : (
        <>
          {/* 1. Trending Now */}
          {trending.length > 0 && (
            <section>
              <h2
                className="mb-4 text-xl font-bold tracking-wide"
                style={{ color: "var(--text-color)" }}
              >
                Trending Now
              </h2>
              <MovieGrid movies={trending} />
            </section>
          )}

          {/* 2. Popular */}
          {popular.length > 0 && (
            <section>
              <h2
                className="mb-4 text-xl font-bold tracking-wide"
                style={{ color: "var(--text-color)" }}
              >
                Popular
              </h2>
              <MovieGrid movies={popular} />
            </section>
          )}

          {/* 3. Top Rated */}
          {topRated.length > 0 && (
            <section>
              <h2
                className="mb-4 text-xl font-bold tracking-wide"
                style={{ color: "var(--text-color)" }}
              >
                Top Rated
              </h2>
              <MovieGrid movies={topRated} />
            </section>
          )}

          {/* Section Separator */}
          {(trending.length > 0 || popular.length > 0 || topRated.length > 0) &&
            (adminRecommendedShows.length > 0 ||
              currentFilteredMovies.length > 0) && (
              <hr
                className="border-t opacity-10"
                style={{ borderColor: "var(--text-color)" }}
              />
            )}

          {/* 4. Admin Recommendations */}
          {adminRecommendedShows.length > 0 && (
            <section>
              <h2
                className="mb-4 text-xl font-bold tracking-wide"
                style={{ color: "var(--primary)" }}
              >
                Admin's Recommendation
              </h2>
              <MovieGrid movies={adminRecommendedShows} />
            </section>
          )}

          {/* 5. All Shows (Local Database Fallback/Catalog) */}
          {currentFilteredMovies.length > 0 && (
            <section>
              <h2
                className="mb-4 text-xl font-bold tracking-wide"
                style={{ color: "var(--text-color)" }}
              >
                Admin's Recommendation
              </h2>
              <MovieGrid movies={currentFilteredMovies} />
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
