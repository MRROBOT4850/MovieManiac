// import './App.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Header from './component/Header';
// import Home from './pages/Home';
// import MovieList from './component/MovieList';
// import Movie from './pages/MovieDetails';
// import Search from "./component/Search"
// import { useState ,useEffect} from 'react';
// import { useParams } from "react-router-dom"
// function App() {
//    let { type } = useParams() || "popular"
//   const [movieList, setMovieList] = useState([])
//    const apiKey = import.meta.env.VITE_API_KEY;
//   const getData = () => {
//         fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=f78cc8c2a7226994a3cb8430b60672b6&language=en-US`)
//             .then(res => res.json())
//             .then(data => console.log(data.results))
//     }
//   useEffect(()=>{
//     fetch(`https://api.themoviedb.org/3/movie/popular?api_key=f78cc8c2a7226994a3cb8430b60672b6&language=en-US&page=1
// `)
//             .then(res => res.json())
//             .then(data => console.log(data.results))
// // const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
// // const options = {
// //   method: 'GET',
// //   headers: {
// //     accept: 'application/json',
// //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzhjYzhjMmE3MjI2OTk0YTNjYjg0MzBiNjA2NzJiNiIsIm5iZiI6MTc0OTUyODI4MC42NDksInN1YiI6IjY4NDdhZWQ4N2E3MWEzZGJhM2JiMzQ1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AXL9begmTs9ng_P1ziGGiGtOHvOq3py_J13RPLousMc'
// //   }
// // };

// // fetch(url, options)
// //   .then(res => res.json())
// //   .then(json => console.log(json))
// //   .catch(err => console.error(err));
//  },[])
//  getData();
//    //console.log(movieList);
//   return (
//     <div className="App">
      
//       <BrowserRouter>
//         <Header />
//         <Routes>
//           <Route index element={<Home />}></Route>
//           <Route path='movie/:id' element={<Movie />}></Route>
//           <Route path='movies/:type' element={<MovieList />}></Route>
//           <Route path='search/:movie' element={<Search />}></Route>
//           <Route path='/*' element={<h1>404 : Page Not Found</h1>}></Route>
//         </Routes>
//       </BrowserRouter>
//       <div className="copyright">Developed by Shivam Chaudhary • 2025</div>

//     </div>
//   );
// }

// export default App;
import './App.css';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Header from './component/Header';
import Home from './pages/Home';
import MovieList from './component/MovieList';
import Movie from './pages/MovieDetails';
import Search from './component/Search';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from './redux/movieSlice';
import Login from './pages/Login'
import Signup from './pages/Signup';
import AuthModal from './pages/AuthModal';
import UserDashboard from './pages/UserDashboard';
import { setUser } from "./redux/authSlice";
function App() {
  const dispatch = useDispatch();
  const { type } = useParams(); // Get type from URL params, e.g., 'popular' or 'top_rated'
  
  // // Get the movie list from Redux store
  const { movieList, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    // Dispatch the fetchMovies action based on the current type (default to 'popular')
    dispatch(fetchMovies(type || 'popular'));
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser({ user: JSON.parse(storedUser), token: null }));
    }
  }, [dispatch, type]); // Re-run whenever `type` changes
  
  useEffect(() => {
    
  }, [dispatch]);
  return (
    <div className="App">
      {/* <BrowserRouter> */}
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="movies/:type" element={<MovieList movieList={movieList} />} />
          <Route path="search/:movie" element={<Search />} />
          {/* <Route path="/auth" element={<Login />} /> */}
         <Route path="/auth" element={<AuthModal />} />
         <Route path="/dashboard" element={<UserDashboard />} />

          <Route path="/*" element={<h1>404 : Page Not Found</h1>} />
        </Routes>
      {/* </BrowserRouter> */}
      <div className="copyright">Developed by Shivam Chaudhary • 2025</div>
    </div>
  );
}

export default App;
