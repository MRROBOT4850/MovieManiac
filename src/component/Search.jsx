import React, { useEffect, useState } from "react"
import "./Search.css"
import { useParams } from "react-router-dom"
import Cards from "./Cards"

const SearchResult = ({ SearchKey }) => {
    const { movie } = useParams()
    const [searchList, setSearchList] = useState([])
  const apiKey = import.meta.env.VITE_API_KEY;
    console.log("api key "+apiKey)
    useEffect(() => {
        // getData()
        searchResult()
    }, []);

    useEffect(() => {
        // getData()
        searchResult()
    }, [movie])


    console.log(movie)

    const search_API =
        `https://api.themoviedb.org/3/search/movie?api_key=f78cc8c2a7226994a3cb8430b60672b6&query=`;

    const searchResult = () => {
        fetch(search_API + movie)
            .then((res) => res.json())
            .then((data) => {
                setSearchList(data.results)
                // console.log(data.results)
            });
    };

    return (
        <div className="movie__list">
            <div className="list__cards">
                {
                    searchList.map(movie => (
                        <Cards key={movie.id} movie={movie} />
                    ))
                }
            </div>
        </div>
    )
}

export default SearchResult