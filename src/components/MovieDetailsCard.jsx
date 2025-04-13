import React from "react";

const MovieDetailsCard = ({ movie }) => {
    const {
        title,
        poster_path,
        vote_average,
        release_date,
        original_language,
        overview,
        tagline,
        runtime,
        genres,
        production_companies,
        cast,
        budget,
        revenue,
    } = movie;

    return (
        <div className="movie-card flex flex-col md:flex-row gap-6 p-6 overflow-y-auto max-h-[80vh] bg-dark-100 rounded-2xl shadow-inner shadow-light-100/10">
            <img
                src={
                    poster_path
                        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                        : "/No-Poster.png"
                }
                alt={title}
                className="rounded-lg w-full md:w-[300px] h-auto object-cover"
            />

            <div className="flex-1 text-white flex flex-col justify-start gap-4">
                <h2 className="text-2xl font-bold">{title}</h2>

                {tagline && (
                    <p className="italic text-light-200 text-base">"{tagline}"</p>
                )}

                <div className="content flex flex-wrap items-center gap-2">
                    <div className="rating flex items-center gap-1">
                        <img src="/star.svg" alt="Star Icon" className="size-4" />
                        <p className="font-bold text-base">{vote_average?.toFixed(1)}</p>
                    </div>
                    <span className="text-sm text-gray-100">•</span>
                    <p className="lang capitalize text-gray-100 font-medium text-base">
                        {original_language}
                    </p>
                    <span className="text-sm text-gray-100">•</span>
                    <p className="year text-gray-100 font-medium text-base">
                        {release_date?.split("-")[0]}
                    </p>
                    {runtime && (
                        <>
                            <span className="text-sm text-gray-100">•</span>
                            <p className="text-gray-100 font-medium text-base">
                                {runtime} mins
                            </p>
                        </>
                    )}
                </div>

                {genres && (
                    <div className="flex flex-wrap gap-2">
                        {genres.map((genre) => (
                            <span
                                key={genre.id}
                                className="bg-light-100/10 px-3 py-1 text-sm text-white rounded-full"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>
                )}

                <p className="text-light-100 text-base leading-relaxed">{overview}</p>

                {production_companies && (
                    <div className="production-companies flex flex-wrap gap-2 mt-4">
                        <p className="font-bold text-light-200 text-lg">Production Companies:</p>
                        {production_companies.map((company) => (
                            <span
                                key={company.id}
                                className="bg-light-100/10 px-3 py-1 text-sm text-white rounded-full"
                            >
                                {company.name}
                            </span>
                        ))}
                    </div>
                )}

                {cast && (
                    <div className="cast mt-4">
                        <p className="font-bold text-light-200 text-lg">Cast:</p>
                        <div className="flex flex-wrap gap-2">
                            {cast.slice(0, 5).map((actor) => (
                                <span
                                    key={actor.id}
                                    className="bg-light-100/10 px-3 py-1 text-sm text-white rounded-full"
                                >
                                    {actor.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {(budget || revenue) && (
                    <div className="finance-details mt-4">
                        <p className="font-bold text-light-200 text-lg">Finance Details:</p>
                        {budget && (
                            <p className="text-light-100 text-base">Budget: ${budget.toLocaleString()}</p>
                        )}
                        {revenue && (
                            <p className="text-light-100 text-base">Revenue: ${revenue.toLocaleString()}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieDetailsCard;
