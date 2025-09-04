import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites, fetchWatchLater } from "../redux/movieSlice";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Cards from "../component/Cards";
import AuthModal from "./AuthModal"; 
import "./UserDashboard.css";
import { logoutUser } from "../redux/authSlice";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { favorites = [], watchLater = [] } = useSelector((state) => state.movies);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchFavorites(user.id));
      //dispatch(fetchWatchLater(user.id));
    }
  }, [dispatch, user?.id]);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleLogout = () => {
   dispatch(logoutUser());
    //localStorage.removeItem("user");
    navigate("/");
  };

  const handleLogin = () => {
    setShowAuthModal(true);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
       <img
        src={
          user?.profilePic ||
          "https://static.vecteezy.com/system/resources/previews/008/149/271/large_2x/user-icon-for-graphic-design-logo-website-social-media-mobile-app-ui-illustration-free-vector.jpg"
        }
        alt="Profile"
        className="dashboard-avatar"
      />

        <h2 className="dashboard-username">{user?.username || "User"}</h2>

     
        {user ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>

    
      <section className="dashboard-section">
        <h3>Favorites</h3>
        <div className="movie-grid">
          {favorites.length > 0 ? (
            favorites.map((movie) => (
              <Cards key={movie.tmdbId || movie._id ||movie.id} movie={movie} />
            ))
          ) : (
            <p>No favorites yet.</p>
          )}
        </div>
      </section>

      <section className="dashboard-section">
        <h3>Watch Later</h3>
        <div className="movie-grid">
          {watchLater.length > 0 ? (
            watchLater.map((movie) => (
              <Cards key={movie.tmdbId || movie._id ||movie.id} movie={movie} />
            ))
          ) : (
            <p>No movies saved for later.</p>
          )}
        </div>
      </section>

      {!user && showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default UserDashboard;
