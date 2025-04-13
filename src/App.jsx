import React, {use, useEffect, useState} from 'react'
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import {useDebounce} from "react-use";
import {getTrendingMovies, updateSearchCount} from "./appwrite.js";
import movieDetailsCard from "./components/MovieDetailsCard.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home.jsx";
import MovieDetails from "./components/MovieDetails.jsx";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        authorization: `Bearer ${API_KEY}`,
    }
}


const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    // Debounce the search term to prevent making too many API requests
    // by waiting for the user to stop typing for 500ms
    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])


    const fetchMovies = async (query = '') => {
        setIsLoading(true);
        setErrorMessage("");

        try {
        const endpoint = query
            ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
            : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

        const response = await fetch(endpoint, API_OPTIONS);

        if (!response.ok) {
            throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
       if (data.response === "False"){
           setErrorMessage(data.Error || "Failed to fetch movies");
           setMovieList([]);
           return;
       }

       setMovieList(data.results || []);

       if (query && data.results.length > 0) {
            await updateSearchCount(query, data.results[0]);
       }


        } catch (error){
            console.error(`Error fetching movies: ${error}`);
            setErrorMessage(`Error fetching movies. Please try again later.`);
        } finally {
            setIsLoading(false);
        }
    }

    const loadTrendingMovies = async () => {
        try {
            const movies = await getTrendingMovies();

            setTrendingMovies(movies);
        } catch (error){
            console.error(`Error fetching trending movies: ${error}`);
        }
    }

    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    useEffect(() => {
        loadTrendingMovies();
    }, []);


    return (
        <Routes>
            <Route
                path="/"
                element={
                <Home
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    trendingMovies={trendingMovies}
                    movieList={movieList}
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                    />
                }
                />
            <Route path="/movie/:id" element={
                <MovieDetails
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                />} />
        </Routes>
    );
}
export default App
