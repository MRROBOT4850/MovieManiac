// // src/components/AuthModal.jsx
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { setUser } from "../redux/authSlice";
// import "./Auth.css";

// const AuthModal = ({ defaultMode = "login"}) => {
//   const [mode, setMode] = useState(defaultMode);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [error, setError] = useState(null);

//   const dispatch = useDispatch();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(
//         mode === "login"
//           ? "http://localhost:5000/login"
//           : "http://localhost:5000/signup",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(
//             mode === "login"
//               ? { email, password }
//               : { name, email, password }
//           ),
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Something went wrong");

//       dispatch(setUser({ user: data.user, token: data.token }));

//       if (onClose) onClose(); // ✅ close modal after successful login/signup
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="auth-overlay">
//       <form className="auth-card" onSubmit={handleSubmit}>
//         {/* Header with title + close button */}
//         <div className="auth-header">
//           <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>
//          <button
//             type="button"
//           className="auth-close"
//           onClick={onClose}
//           aria-label="Close"
//         >
//             ×
//           </button>
//         </div>

//         {error && <div className="auth-error">{error}</div>}

//         {mode === "signup" && (
//           <input
//             type="text"
//             placeholder="Name"
//             className="auth-input"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         )}

//         <input
//           type="email"
//           placeholder="Email"
//           className="auth-input"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="auth-input"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit" className="auth-btn">
//           {mode === "login" ? "Login" : "Sign Up"}
//         </button>

//         <p className="auth-footer">
//           {mode === "login" ? (
//             <>Don’t have an account?{" "}
//               <span className="auth-link" onClick={() => setMode("signup")}>
//                 Sign up
//               </span>
//             </>
//           ) : (
//             <>Already have an account?{" "}
//               <span className="auth-link" onClick={() => setMode("login")}>
//                 Login
//               </span>
//             </>
//           )}
//         </p>
//       </form>
//     </div>
//   );
// };

// export default AuthModal;

// src/components/AuthModal.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import "./Auth.css";
import { toast } from "react-toastify"; // npm install react-toastify
import "react-toastify/dist/ReactToastify.css";

const AuthModal = ({ mode: defaultMode = "login", onClose }) => {
  const [mode, setMode] = useState(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;

    setError(null); // clear old errors

    try {
      setIsSending(true);

      const res = await fetch(
        mode === "login"
          ? "http://localhost:5000/api/users/login"
          : "http://localhost:5000/api/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            mode === "login"
              ? { email, password }
              : { username, email, password }
          ),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        toast.error(data.message || "Something went wrong");
        return; // ❌ stop here
      }

      // ✅ success
      dispatch(setUser({ user: data.user, token: data.token }));
      toast.success(mode === "login" ? "Logged in!" : "Signed up!");
      onClose();
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Network error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="auth-overlay">
      <form className="auth-card" onSubmit={handleSubmit}>
        {/* Header */}
        <div className="auth-header">
          <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>
          <button
            type="button"
            className="auth-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Inline error */}
        {error && <div className="auth-error">{error}</div>}

        {mode === "signup" && (
          <input
            type="text"
            placeholder="Name"
            className="auth-input"
            value={username}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={isSending}
          className={`auth-btn ${isSending ? "btn-disabled" : ""}`}
        >
          {isSending
            ? "Processing..."
            : mode === "login"
            ? "Login"
            : "Sign Up"}
        </button>

        <p className="auth-footer">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <span className="auth-link" onClick={() => setMode("signup")}>
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span className="auth-link" onClick={() => setMode("login")}>
                Login
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default AuthModal;
