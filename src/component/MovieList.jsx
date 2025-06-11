import React, { useEffect, useState } from "react"
import "./MovieList.css"
import { useParams } from "react-router-dom"
import Cards from "./Cards"
import {CircularProgress} from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
const MovieList = () => {
    const [page,setPage]=useState(1);
    const [isLoading,setLoading]=useState(false);
    const [movieList, setMovieList] = useState([])
    const [scrollPosition, setScrollPosition] = useState(0);
    const {type}=useParams();
    //console.log(type)
const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    console.log("click ho gya hai");
};

useEffect(() => {
    if (page > 1) { // Ensure it doesn't scroll on the initial render
        //getData();
        setTimeout(() => {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
            });
        }, 900); // Delay to allow rendering
    }
}, [page]);


    //const { type } = useParams()
    // const loadMore=()=>{
    //     //getData();
    //     setPage(page=>page+1)
    //     console.log("click ho gya hai")
    
    // }
    // useEffect(() => {
    //     getData()
    // }, [page]);

 useEffect(() => {
    // Reset when type changes
    setMovieList([]);
    setPage(1);
}, [type]);

useEffect(() => {
    getData();
}, [page]);

    //const api=https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&with_genres=28-action,12-adventuure,35-comedy

    const getData = () => {
        setLoading(true)
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=f78cc8c2a7226994a3cb8430b60672b6&page=${page}&with_genres=${type}&language=en-US`)
        .then(res => res.json())
        .then(data => {
            setMovieList(prev => [...prev, ...data.results]);
            console.log(`${page} itni baar call hua hoon`);
            setLoading(false);
        });
}

   const movieMap = new Map([
  ["28", "Action"],
  ["12", "Adventure"],
  ["35", "Comedy"],
  ["27", "Horror"],
  ["16", "Animated"],
]);
    
    console.log(typeof type)

    console.log(movieMap.get(type));
    return (<>
       {
        isLoading?(<CircularProgress color="primary" />):(<div className="movie__list">
            <h2 className="list__title">{movieMap.get(type)} Movies</h2>
            <div className="list__cards">
                {
                    movieList.map(movie => (
                        <Cards key={uuidv4(10)} movie={movie} />
                    ))
                }
            </div>
            <button className="load-btn" onClick={loadMore}>Load More...</button>
        </div>)
       }
       </>
    )
}

export default MovieList

