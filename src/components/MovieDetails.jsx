import React, { useEffect, useState} from 'react'
import {useLocation} from "react-use";
import {useParams} from "react-router-dom";
import Search from "./Search.jsx";
import Spinner from "./Spinner.jsx";
import MovieDetailsCard from "./MovieDetailsCard.jsx";
import MovieCard from "./MovieCard.jsx";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        authorization: `Bearer ${API_KEY}`,
    },
};

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");


    const fetchMovieDetails = async () => {
        setIsLoading(true);
        setErrorMessage("");

        try {
            const endpoint = `${API_BASE_URL}/movie/${id}`

            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error("Failed to fetch movie details");
            }

            const data = await response.json();
            if (data.response === "False"){
                setErrorMessage(data.Error || "Failed to fetch details");
                setMovie(null);
                return;
            }
            setMovie(data);

        } catch (error) {
            console.error(`Error fetching movie details: ${error}`);
            setErrorMessage(`Error fetching movie details. Please try again later.`);

        } finally {
            setIsLoading(false);
        }

    };

    useEffect(() => {
        fetchMovieDetails();
    }, [id] )

    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">
                <header>
                </header>

                <section >
                    {isLoading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <div className="bg-primary flex-1">
                            <MovieDetailsCard movie={movie} />
                        </div>
                    )
                    }
                </section>
            </div>
        </main>

    );
};
export default MovieDetails
