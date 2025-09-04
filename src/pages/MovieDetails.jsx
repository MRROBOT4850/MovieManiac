// import React, { useEffect, useState } from "react"
// import "./MovieDetails.css"
// import { useParams } from "react-router-dom"

// const Movie = () => {
//     const [currentMovieDetail, setMovie] = useState()
//     const { id } = useParams()
//     const apiKey = import.meta.env.VITE_API_KEY;
//     useEffect(() => {
//         getData()
//         window.scrollTo(0, 0)
//     }, [])

//     const getData = () => {
//     fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=f78cc8c2a7226994a3cb8430b60672b6&language=en-US&append_to_response=videos,credits`)
//         .then(res => res.json())
//         .then(data => {setMovie(data),console.log(data)})
// }


//     return (
//         <div className="movie">
//             <div className="movie__intro">
//                 <img className="movie__backdrop" alt="" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
//             </div>
//             <div className="movie__detail">
//                 <div className="movie__detailLeft">
//                     <div className="movie__posterBox">
//                         <img className="movie__poster" alt="" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
//                     </div>
//                 </div>
//                 <div className="movie__detailRight">
//                     <div className="movie__detailRightTop">
//                         <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
//                         <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
//                         <div className="movie__rating">
//                             {currentMovieDetail ? currentMovieDetail.vote_average : ""} <i className="fas fa-star" />
//                             <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
//                         </div>
//                         <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
//                         <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
//                         <div className="movie__genres">
//                             {
//                                 currentMovieDetail && currentMovieDetail.genres
//                                     ?
//                                     currentMovieDetail.genres.map(genre=> (
//                                         <span className="movie__genre" key={genre.id} id={genre.id}>{genre.name}</span>
//                                     ))
//                                     :
//                                     ""
//                             }
//                         </div>
//                     </div>
//                     <div className="movie__detailRightBottom">
//                         <div className="synopsisText">Synopsis</div>
//                         <div className="synanpisDisc">{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
//                     </div>

//                 </div>
//             </div>
//             <div className="movie__links">
//                 <div className="movie__heading">Useful Links</div>
//                 {
//                     currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank" style={{ textDecoration: "none" }}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
//                 }
//                 {
//                     currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{ textDecoration: "none" }}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
//                 }
//             </div>
//             <div className="movie__heading production">Production companies</div>
//             <div className="movie__production">
//                 {
//                     currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
//                         <>
//                             {
//                                 company.logo_path
//                                 &&
//                                 <span className="productionCompanyImage" key={company.id} >
//                                     <img className="movie__productionComapany" alt="" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
//                                     <span >{company.name}</span>
//                                 </span>
//                             }
//                         </>
//                     ))
//                 }
//             </div>
//               <div className="helo">
//             <div className="movie__trailer">
//     <h2>Movie's Clip</h2>
//     {currentMovieDetail && currentMovieDetail.videos && currentMovieDetail.videos.results.length > 0 ? (
//         <div className="trailer__grid">
//             {currentMovieDetail.videos.results.slice(0, 5).map(video => (
//                 <div key={video.id} className="trailer__item">
//                     <iframe
//                         src={`https://www.youtube.com/embed/${video.key}`}
//                         title={video.name || "Trailer"}
//                         frameBorder="0"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                         allowFullScreen
//                     ></iframe>
//                 </div>
//             ))}
//         </div>
//     ) : (
//         <p>No trailers available</p>
//     )}
// </div>

//         </div>

//         {/* Cast Section */}
//         <div className="movie__cast">
//             <h2>Cast</h2>
//             <div className="cast__list">
//                 {currentMovieDetail && currentMovieDetail.credits && currentMovieDetail.credits.cast.slice(0, 10).map(actor => (
//                     <div key={actor.cast_id} className="cast__member">
//                         <img
//                             src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : "/default-profile.png"}
//                             alt={actor.name}
//                         />
//                         <p>{actor.name}</p>
//                         <p className="character">{actor.character}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
    
//         </div>
//     )
// }

// export default Movie
import React, { useEffect, useState } from "react";
import "./MovieDetails.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleFavorite,
  toggleWatchLater,
  fetchFavorites,
  fetchWatchLater,
} from "../redux/movieSlice";
import { toast } from "react-toastify";
import {
  FaHeart,
  FaRegHeart,
  FaClock,
  FaStar,
  FaExternalLinkAlt,
} from "react-icons/fa";
import AuthModal from "./AuthModal";

const Movie = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

 const { favorites = [], watchLater = [] } = useSelector((state) => state.movies || {});

  const { user, token } = useSelector((state) => state.auth);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentMovieDetail, setMovie] = useState(null);

  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [watchLaterLoading, setWatchLaterLoading] = useState(false);

  const apiKey =
    import.meta.env.VITE_API_KEY || "f78cc8c2a7226994a3cb8430b60672b6";

  // Sync favorites/watchLater from backend when user logs in
  useEffect(() => {
    if (user?.id && token) {
      dispatch(fetchFavorites(user.id));
      //dispatch(fetchWatchLater(user.id));
    }
  }, [dispatch, user?.id, token]);

  // Fetch movie details
  useEffect(() => {
    if (!id) return;
    window.scrollTo(0, 0);
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=videos,credits`
      );
      const data = await res.json();
      setMovie(data);
    } catch (err) {
      console.error("fetchMovie error:", err);
      toast.error("Failed to load movie details");
    }
  };

  const tmdbId = currentMovieDetail?.id || currentMovieDetail?.tmdbId;
  // const isFavorite = favorites.includes(tmdbId);
  // const isWatchLater = watchLater.includes(tmdbId);
  const isFavorite = favorites.some(fav => fav.id === tmdbId || fav.tmdbId === tmdbId);
const isWatchLater = watchLater.some(w => w.id === tmdbId || w.tmdbId === tmdbId);
  const handleFavorites = async () => {
    if (!token) return setShowAuthModal(true);
    if (!currentMovieDetail) return;

    try {
      setFavoriteLoading(true);
      await dispatch(
        toggleFavorite({ userId: user?.id, movie: currentMovieDetail, isFavorite })
      ).unwrap();
      toast.success(isFavorite ? "Removed from Favorites" : "Added to Favorites");
    } catch (err) {
      console.error("toggleFavorite err:", err);
      toast.error("Could not update Favorites");
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleWatchLater = async () => {
    if (!token) return setShowAuthModal(true);
    if (!currentMovieDetail) return;

    try {
      setWatchLaterLoading(true);
      await dispatch(
        toggleWatchLater({ userId: user?.id, movie: currentMovieDetail, isWatchLater })
      ).unwrap();
      toast.success(isWatchLater ? "Removed from Watch Later" : "Added to Watch Later");
    } catch (err) {
      console.error("toggleWatchLater err:", err);
      toast.error("Could not update Watch Later");
    } finally {
      setWatchLaterLoading(false);
    }
  };

  if (!currentMovieDetail) {
    return (
      <div className="movie">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="movie">
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}

      {/* Backdrop */}
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          alt={currentMovieDetail.title}
          src={
            currentMovieDetail.backdrop_path
              ? `https://image.tmdb.org/t/p/original${currentMovieDetail.backdrop_path}`
              : "/fallback-backdrop.jpg"
          }
        />
      </div>

      {/* Movie details */}
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              alt={currentMovieDetail.title}
              src={
                currentMovieDetail.poster_path
                  ? `https://image.tmdb.org/t/p/original${currentMovieDetail.poster_path}`
                  : "/fallback-poster.jpg"
              }
            />
          </div>
        </div>

        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <h1 className="movie__name">{currentMovieDetail.original_title}</h1>
            <p className="movie__tagline">{currentMovieDetail.tagline}</p>

            <div className="movie__metaRow">
              <div className="movie__rating">
                <FaStar /> {currentMovieDetail.vote_average}
                <span className="movie__voteCount">
                  {" "}
                  ({currentMovieDetail.vote_count}) votes
                </span>
              </div>
              <div className="movie__runtime">{currentMovieDetail.runtime} mins</div>
              <div className="movie__releaseDate">
                Release date: {currentMovieDetail.release_date}
              </div>
            </div>

            <div className="movie__genres">
              {currentMovieDetail.genres?.map((genre) => (
                <span className="movie__genre" key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Synopsis & Actions */}
            <div className="movie__detailRightBottom">
              <h3>Synopsis</h3>
              <p className="movie__overview">{currentMovieDetail.overview}</p>

              <div className="movie__actions">
                <button
                  className={`actionBtn ${isFavorite ? "active" : ""}`}
                  onClick={handleFavorites}
                  aria-pressed={isFavorite}
                  aria-label="Toggle Favorite"
                  disabled={favoriteLoading}
                >
                  {favoriteLoading ? "..." : isFavorite ? <FaHeart /> : <FaRegHeart />}
                  <span className="btnText">
                    {isFavorite ? "Favorited" : "Add to Favorites"}
                  </span>
                </button>

                <button
                  className={`actionBtn ${isWatchLater ? "active watch" : "watch"}`}
                  onClick={handleWatchLater}
                  aria-pressed={isWatchLater}
                  aria-label="Toggle Watch Later"
                  disabled={watchLaterLoading}
                >
                  {watchLaterLoading ? "..." : <FaClock />}
                  <span className="btnText">
                    {isWatchLater ? "Saved" : "Watch Later"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Useful Links */}
      <div className="movie__links">
        <div className="movie__heading">Useful Links</div>
        {currentMovieDetail.homepage && (
          <a
            href={currentMovieDetail.homepage}
            target="_blank"
            rel="noreferrer"
            className="movie__linkItem"
          >
            <FaExternalLinkAlt /> <span>Homepage</span>
          </a>
        )}
        {currentMovieDetail.imdb_id && (
          <a
            href={`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`}
            target="_blank"
            rel="noreferrer"
            className="movie__linkItem"
          >
            <FaExternalLinkAlt /> <span>IMDb</span>
          </a>
        )}
      </div>

      {/* Production companies */}
      <div className="movie__heading production">Production companies</div>
      <div className="movie__production">
        {currentMovieDetail.production_companies?.map((company) =>
          company.logo_path ? (
            <span className="productionCompanyImage" key={company.id}>
              <img
                className="movie__productionComapany"
                alt={company.name}
                src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
              />
              <span>{company.name}</span>
            </span>
          ) : null
        )}
      </div>

      {/* Trailers */}
      <div className="movie__trailer">
        <h2>Movie's Clip</h2>
        {currentMovieDetail.videos?.results?.length > 0 ? (
          <div className="trailer__grid">
            {currentMovieDetail.videos.results.slice(0, 5).map((video) => (
              <div key={video.key} className="trailer__item">
                <iframe
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name || "Trailer"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No trailers available</p>
        )}
      </div>

      {/* Cast */}
      <div className="movie__cast">
        <h2>Cast</h2>
        <div className="cast__list">
          {currentMovieDetail.credits?.cast?.slice(0, 10).map((actor) => (
            <div key={actor.cast_id || actor.id} className="cast__member">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "/default-profile.png"
                }
                alt={actor.name}
              />
              <p>{actor.name}</p>
              <p className="character">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;
