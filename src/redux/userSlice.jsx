import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  favorites: [],
  watchLater: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginState: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
    addToWatchLater: (state, action) => {
      state.watchLater.push(action.payload);
    },
    removeFromWatchLater: (state, action) => {
      state.watchLater = state.watchLater.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
  },
});

export const {
  setLoginState,
  addToFavorites,
  removeFromFavorites,
  addToWatchLater,
  removeFromWatchLater,
} = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
