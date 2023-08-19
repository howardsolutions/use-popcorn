import { useState, useEffect } from "react";

/**
 * a Hook to get list of movies.
 * @param {string} query - movie name
 * @param {Function} callback - (Optional) - additional callback function
 * @return {movies, isLoading, error} - list of movie, isLoading state, error state
 */

const KEY = "e140aa45";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      setIsLoading(true);
      setError("");

      try {
        const res = await fetch(
          ` http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
        );

        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies");
        }

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data?.Search);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    const getMovies = setTimeout(fetchMovie, 400);

    return () => clearTimeout(getMovies);
  }, [query]);

  return { movies, isLoading, error };
}
