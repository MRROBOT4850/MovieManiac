// src/pages/Signup.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "./Auth.css"

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });
      dispatch(setUser({ user: res.data.user, token: res.data.token }));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black">
      <form
        onSubmit={handleSignup}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Sign Up
        </h2>

        {error && (
          <p className="bg-red-500 text-white p-2 rounded mb-4 text-sm text-center">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 rounded bg-gray-700 text-white mb-4 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-700 text-white mb-4 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-gray-700 text-white mb-6 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold"
        >
          Sign Up
        </button>

        <p className="text-gray-400 mt-4 text-sm text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-red-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
