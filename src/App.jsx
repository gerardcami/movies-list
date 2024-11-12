import { useEffect, useState } from "react";

import "react-circular-progressbar/dist/styles.css";

import { MovieDetails } from "./components/MovieDetails";
import { MoviesList } from "./components/MoviesList";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

const API_KEY = "9a602b7d84929ff0257c5089227242ba";
const BASE_URL = "http://api.themoviedb.org/3/";
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w200";

function App() {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}genre/movie/list?api_key=${API_KEY}`
      );
      const result = await response.json();
      setGenres([{ id: 1, name: "All" }, ...result.genres]);
    } catch (error) {
      console.error("Error fetching genres:", error);
      setGenres([]);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}movie/popular?api_key=${API_KEY}`
      );
      const result = await response.json();
      setMovies(result.results);
    } catch (error) {
      console.log("Error fetching movies: ", error);
      setMovies([]);
    }
  };

  useEffect(() => {
    fetchGenres();
    fetchMovies();
  }, []);

  const handleGenreChange = async (genre) => {
    if (genre !== "1") {
      try {
        const response = await fetch(
          `${BASE_URL}discover/movie?&with_genres=${genre}&api_key=${API_KEY}`
        );
        const result = await response.json();
        setMovies(result.results);
      } catch (error) {
        console.log("Error fetching details: ", error);
        setMovies([]);
      }
    } else {
      fetchMovies();
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const genre =
      data.get("genreSelector") !== "1" ? data.get("genreSelector") : "";
    const movieTitle = encodeURIComponent(data.get("movieTitle"));

    try {
      const response = await fetch(
        `${BASE_URL}search/movie?api_key=${API_KEY}&with_genres=${genre}&query=${movieTitle}`
      );
      const result = await response.json();
      setMovies(result.results);
    } catch (error) {
      console.log("Error fetching details: ", error);
      setMovies([]);
    }
  };

  return (
    <BrowserRouter>
      <header>
        <h1>Movies List with TMDB API</h1>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <MoviesList
              movies={movies}
              genres={genres}
              onFormSubmit={handleFormSubmit}
              onGenreChange={handleGenreChange}
              base_image_url={BASE_IMAGE_URL}
            />
          }
        />

        <Route
          path="/movie/:id"
          element={
            <MovieDetails base_url={BASE_URL} base_image_url={BASE_IMAGE_URL} />
          }
        />
      </Routes>

      <footer>
        <p>Movies list project for practise</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
