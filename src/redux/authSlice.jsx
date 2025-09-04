
import { createSlice } from "@reduxjs/toolkit";
import { resetMovies } from "./movieSlice";


const storedUser = localStorage.getItem("user");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Persist only the user object in localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    // logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
    },
  },
});

//  Thunk logout (also resets movies state) , theek se smjh le bete
export const logoutUser = () => (dispatch) => {
  dispatch(logout());
  dispatch(resetMovies());
};

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
