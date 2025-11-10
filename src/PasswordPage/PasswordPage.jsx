import React, { useState } from 'react';
import './PasswordPage.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setUserLoggedIn, fetchUserData } from '../utils/authUtils';

const PasswordPage = () => {
    const location = useLocation();
    const { email } = location.state || {};

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const navigator = useNavigate();
    const [displayMessage, setDisplayMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password.trim() === ""){
            setDisplayMessage("Password field cannot be empty!");
        }
        try {
            const res = await axios.get("http://localhost:8080/users/getPassword", {
                params: {
                    email: email,
                    password: password
                },
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.data === "Password Exist!") {
                setDisplayMessage("");
                
                try {
                    const userData = await fetchUserData(email);
                    
                    if (userData) {
                        setUserLoggedIn(email, userData.role || "USER", userData);
                    } else {
                        setUserLoggedIn(email, "USER");
                    }
                    
                    const loginEvent = new Event("userLogin");
                    window.dispatchEvent(loginEvent);
                    
                    navigator("/");
                } catch (error) {
                    setUserLoggedIn(email, "USER");
                    navigator("/");
                }
                return;
            }
            else {
                setDisplayMessage("Password is incorrect");
            }
        }
        catch (error) {
            setDisplayMessage("Server error. Server is down.");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="password-page">
            <div className="password-container">
                <h1 className="welcome-title">Welcome</h1>
                <form className="password-form">
                    <div className="password-input-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="password-input"
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={togglePasswordVisibility}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? (
                                <svg className="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            ) : (
                                <svg className="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className='message-container'>
                        <p >{displayMessage}</p>
                    </div>

                    <div className="form-options">
                        <label className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={keepLoggedIn}
                                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                                className="checkbox-input"
                                style={{ accentColor: 'green' }}
                            />
                            <span className="checkbox-text">Keep me logged in</span>
                        </label>

                        <a className="forgot-password-link">
                            Forgot password?
                        </a>
                    </div>

                    <button type="submit" className="login-button" onClick={handleSubmit}>
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasswordPage;
