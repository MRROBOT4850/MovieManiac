import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import "./Home.css"
import MovieList from "../component/MovieList"
import MovieRow from '../component/MovieRow';

const Home = () => {
    const [popularmovies, setPopularmovies] = useState([])
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=f78cc8c2a7226994a3cb8430b60672b6&language=en-US")
            .then(res => res.json())
            .then(data => setPopularmovies(data.results))


    }, [])
    return (
        <>
            <div className="poster">
                <div className="carousel_container">
                    {popularmovies.length > 0 ? (
  <Carousel
    showThumbs={false}
    autoPlay={true}
    transitionTime={1.5}
    infiniteLoop={true}
    showStatus={false}
  >
    {popularmovies.slice(0, 10).map(movie => (
      <Link key={movie.id} to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
        <div className="posterImage">
          <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
          <div className="posterImage__overlay">
            <div className="posterImage__title">{movie.original_title}</div>
            <div className="posterImage__runtime">
              {movie.release_date}
              <span className="posterImage__rating">
                {movie.vote_average} <i className="fas fa-star" />
              </span>
            </div>
            <div className="posterImage__description">{movie.overview}</div>
          </div>
        </div>
      </Link>
    ))}
  </Carousel>
) : (
  <p>Loading...</p>
)}

                </div>
               
                 <MovieRow title="Popular" fetchUrl={`https://api.themoviedb.org/3/movie/popular?api_key=f78cc8c2a7226994a3cb8430b60672b6&language=en-US`} />
                <MovieRow title="Top Rated" fetchUrl={`https://api.themoviedb.org/3/movie/top_rated?api_key=f78cc8c2a7226994a3cb8430b60672b6&language=en-US`} />
                <MovieRow title="Upcoming" fetchUrl={`https://api.themoviedb.org/3/movie/upcoming?api_key=f78cc8c2a7226994a3cb8430b60672b6&language=en-US`} />
                <MovieRow title="Now Playing" fetchUrl={`https://api.themoviedb.org/3/movie/now_playing?api_key=f78cc8c2a7226994a3cb8430b60672b6&language=en-US`} />

            </div>
        </>
    )
}

export default Home