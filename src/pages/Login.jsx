
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "./Auth.css"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      dispatch(setUser({ user: res.data.user, token: res.data.token }));
      navigate("/"); // redirect to homepage or dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
   <div className="auth-container">
  <form className="auth-card">
    <h2>Login</h2>
    <input className="auth-input" type="email" placeholder="Email" />
    <input className="auth-input" type="password" placeholder="Password" />
    <button className="auth-btn">Login</button>
    <p className="auth-footer">
      Don’t have an account? <span>Sign up</span>
    </p>
  </form>
</div>
  );
};

export default Login;
