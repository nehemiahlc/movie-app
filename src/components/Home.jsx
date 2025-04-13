import React from 'react'
import Search from "./Search.jsx";
import Spinner from "./Spinner.jsx";
import MovieCard from "./MovieCard.jsx";

const Home = ({ searchTerm, setSearchTerm, trendingMovies, movieList, isLoading, errorMessage, setMovieDetails }) => {
    return (
        <main>
            <div className="pattern" />

            <div className="wrapper">
                <header>
                    <img src="./hero-img.png" alt="Hero Banner" />
                    <h1>Find <span className="text-gradient"> Movies </span> You'll Enjoy Without The Hassle</h1>

                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>

                { trendingMovies.length > 0 && (
                    <section className="trending">
                        <h2> Trending Movies</h2>
                        <ul>
                            {trendingMovies.map((movie, index) => (
                                <li key={movie.$id}>
                                    <p> {index + 1}</p>
                                    <img src={movie.poster_url} alt={movie.title}/>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}


                <section className="all-movies">
                    <h2>All Movies</h2>

                    {isLoading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie}/>
                            ))}
                        </ul>
                    )
                    }
                </section>
            </div>
        </main>
    )
}

export default Home
