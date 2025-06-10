import React, { useEffect, useState } from "react"
import "./MovieDetails.css"
import { useParams } from "react-router-dom"

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState()
    const { id } = useParams()
    const apiKey = import.meta.env.VITE_API_KEY;
    useEffect(() => {
        getData()
        window.scrollTo(0, 0)
    }, [])

    const getData = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=f78cc8c2a7226994a3cb8430b60672b6&language=en-US&append_to_response=videos,credits`)
        .then(res => res.json())
        .then(data => {setMovie(data),console.log(data)})
}


    return (
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" alt="" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" alt="" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average : ""} <i className="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                    ?
                                    currentMovieDetail.genres.map(genre=> (
                                        <span className="movie__genre" key={genre.id} id={genre.id}>{genre.name}</span>
                                    ))
                                    :
                                    ""
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div className="synanpisDisc">{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>

                </div>
            </div>
            <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {
                    currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank" style={{ textDecoration: "none" }}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{ textDecoration: "none" }}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            <div className="movie__heading production">Production companies</div>
            <div className="movie__production">
                {
                    currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                        <>
                            {
                                company.logo_path
                                &&
                                <span className="productionCompanyImage" key={company.id} >
                                    <img className="movie__productionComapany" alt="" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span >{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
              <div className="helo">
            <div className="movie__trailer">
    <h2>Movie's Clip</h2>
    {currentMovieDetail && currentMovieDetail.videos && currentMovieDetail.videos.results.length > 0 ? (
        <div className="trailer__grid">
            {currentMovieDetail.videos.results.slice(0, 5).map(video => (
                <div key={video.id} className="trailer__item">
                    <iframe
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title={video.name || "Trailer"}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            ))}
        </div>
    ) : (
        <p>No trailers available</p>
    )}
</div>

        </div>

        {/* Cast Section */}
        <div className="movie__cast">
            <h2>Cast</h2>
            <div className="cast__list">
                {currentMovieDetail && currentMovieDetail.credits && currentMovieDetail.credits.cast.slice(0, 10).map(actor => (
                    <div key={actor.cast_id} className="cast__member">
                        <img
                            src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : "/default-profile.png"}
                            alt={actor.name}
                        />
                        <p>{actor.name}</p>
                        <p className="character">{actor.character}</p>
                    </div>
                ))}
            </div>
        </div>
    
        </div>
    )
}

export default Movie