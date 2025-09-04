
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  movies: [],      
  favorites: [],
  watchLater: [],
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (type = "popular") => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=f78cc8c2a7226994a3cb8430b60672b6&language=en-US`
    );
    const data = await response.json();
    return data.results;
  }
);


export const fetchFavorites = createAsyncThunk(
  "movies/fetchFavorites",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/users/getfavorite`, { userId });
      return res.data.data.favorites || [];
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const fetchWatchLater = createAsyncThunk(
  "movies/fetchWatchLater",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/watchlater`);
      return res.data.watchLater || [];
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// export const toggleFavorite = createAsyncThunk(
//   "movies/toggleFavorite",
//   async ({ userId, movie, isFavorite }, { rejectWithValue }) => {
//     try {
//       if (isFavorite) {
//         // remove favorite -> backend returns updated favorites
//         const res = await axios.post(
//           "http://localhost:5000/api/users/removeFavorite",
//           { userId, movieId: movie.id }
//         );
//         return res.data.favorites; // ✅ updated favorites array
//       } else {
//         // add favorite -> backend returns updated favorites
//         const res = await axios.post(
//           "http://localhost:5000/api/users/favorites",
//           { userId, movieId: movie.id }
//         );

//         // save movie details separately
//         await axios.post("http://localhost:5000/api/movies/add", movie);

//         return res.data.favorites; // ✅ updated favorites array
//       }
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

export const toggleFavorite = createAsyncThunk(
  "movies/toggleFavorite",
  async ({ userId, movie, isFavorite }, { rejectWithValue }) => {
    try {
      if (isFavorite) {
        // remove favorite
        await axios.post(`http://localhost:5000/api/users/removeFavorite`, { userId, movieId: movie.id });
        return { movie, action: "remove" };
      } else {
        // add favorite
        await axios.post(`http://localhost:5000/api/users/favorites`, { userId, movieId: movie.id });
        await axios.post(`http://localhost:5000/api/movies/add`, movie); // save movie details
        return { movie, action: "add" };
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// export const toggleFavorite = createAsyncThunk(
//   "movies/toggleFavorite",
//   async ({ userId, movie, isFavorite }, { rejectWithValue }) => {
//     try {
//       if (isFavorite) {
//         // remove favorite -> backend returns updated array
//         const res = await axios.post(
//           "http://localhost:5000/api/users/removeFavorite",
//           { userId, movieId: movie.id }
//         );
//         return res.data.favorites; // updated favorites array
//       } else {
//         // add favorite -> backend returns updated array
//         const res = await axios.post(
//           "http://localhost:5000/api/users/favorites",
//           { userId, movieId: movie.id }
//         );

//         // Save movie details for DB
//         await axios.post("http://localhost:5000/api/movies/add", movie);

//         return res.data.favorites; // updated favorites array
//       }
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );


export const toggleWatchLater = createAsyncThunk(
  "movies/toggleWatchLater",
  async ({ userId, movie, isWatchLater }, { rejectWithValue }) => {
    try {
      if (isWatchLater) {
        // remove watch later
        await axios.post(`http://localhost:5000/api/users/removeWatchLater`, { userId, movieId: movie.id });
        return { movie, action: "remove" };
      } else {
        // add watch later
        await axios.post(`http://localhost:5000/api/users/watchlater`, { userId, movieId: movie.id });
        await axios.post(`http://localhost:5000/api/movies/add`, movie); 
        return { movie, action: "add" };
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    resetMovies(state) {
      state.favorites = [];
      state.watchLater = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // 📌 Movies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // 📌 Favorites
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      // .addCase(toggleFavorite.fulfilled, (state, action) => {
      //   state.favorites = action.payload; // always match backend
      // })
       .addCase(toggleFavorite.fulfilled, (state, action) => {
            const { movie, action: act } = action.payload;
            if (act === "add") {
              state.favorites.push(movie); // add optimistically
            } else if (act === "remove") {
              state.favorites = state.favorites.filter(
                fav => fav.id !== movie.id && fav.tmdbId !== movie.id
              );
            }
          })
      
      .addCase(fetchWatchLater.fulfilled, (state, action) => {
        state.watchLater = action.payload;
      })

      
      // .addCase(toggleFavorite.fulfilled, (state, action) => {
      //   const { movie, action: act } = action.payload;
      //   if (act === "add") {
      //     state.favorites.push(movie);
      //   } else {
      //     state.favorites = state.favorites.filter((m) => m.id !== movie.id);
      //   }
      // })
       
    
      .addCase(toggleWatchLater.fulfilled, (state, action) => {
        const { movie, action: act } = action.payload;
        if (act === "add") {
          state.watchLater.push(movie);
        } else {
          state.watchLater = state.watchLater.filter((m) => m.id !== movie.id);
        }
      });
  },
});

export const { clearError, resetMovies } = movieSlice.actions;
export default movieSlice.reducer;
