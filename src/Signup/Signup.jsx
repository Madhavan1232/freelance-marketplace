import React, { useState } from 'react';
import './Signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchUserData } from '../utils/authUtils';

function Signup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [backEndrepo, setBackEndrepo] = useState("");
  const navigate = useNavigate();

  const handelContinue = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      setError("Email field cannot be empty!");
      setBackEndrepo("");
      return;
    } else {
      setError("");
    }
    try {
      const response = await axios.get("http://localhost:8080/users/getUsers", {
        params: { email: email }
      });
      
      if (response.data === "Email Exists!") {
        await fetchUserData(email);
        setBackEndrepo("");
        navigate("/password", { state: { email } });
      } else {
        setBackEndrepo("Email does not exist!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setBackEndrepo("Server error. Please try again later.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="logo">
          <h1>Flexora</h1>
        </div>

        <h2 className="signup-title">Log in to Flexora</h2>

        <form className="signup-form" onSubmit={handelContinue}>
          <div className="form-group">
            <div className="input-with-icon">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <input
                type="email"
                value={email}
                placeholder="Enter work email"
                className="form-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error && <p style={{ color: "red", marginTop: "4px" }}>{error}</p>}
            {backEndrepo && <p style={{ color: "red", marginTop: "4px" }}>{backEndrepo}</p>}
          </div>

          <button type="submit" className="continue-button">
            Continue
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <button type="button" className="social-button google-button">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg" alt="Google" />
            Continue with Google
          </button>

          <button type="button" className="social-button apple-button">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
            Continue with Apple
          </button>

          <div className="signup-link">
            Do not have an account in Flexora? <a href="/signup">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
