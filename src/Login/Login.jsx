import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUserTie, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { setUserLoggedIn } from "../utils/authUtils";

function Login() {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const validateForm = () => {
        const newErrors = {};
        
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        }
        
        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        
        if (!role) {
            newErrors.role = "Please select a role";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleLoginButton = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsLoading(true);
        
        try {
            const checkEmailResponse = await axios.get(`http://localhost:8080/users/getUsers?email=${encodeURIComponent(email)}`);
            
            if (checkEmailResponse.data === "Email Exists!") {
                setErrors({ email: "This email is already registered" });
                setIsLoading(false);
                return;
            }
            
            await createAccount();
            
            setUserLoggedIn(email, role.toUpperCase());
            
            if (role.toLowerCase() === "freelancer") {
                navigate("/freelancer-profile");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error during registration process:", error);
            setErrors({ form: "Registration failed. Please try again." });
            setIsLoading(false);
        }
    };
    
    const createAccount = async () => {
        try {
            const response = await axios.post("http://localhost:8080/users/register", {
                email: email,
                passwordHash: password,
                role: role.toUpperCase()
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Account created successfully:", response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error creating account:", error);
            setErrors({ form: "Failed to create account. Please try again." });
            setIsLoading(false);
            throw error; 
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">
                    <h1>Flexora</h1>
                </div>

                <h2 className="login-title">Let's get started</h2>

                {errors.form && (
                    <div className="error-message">
                        <FontAwesomeIcon icon={faExclamationCircle} className="error-icon" />
                        {errors.form}
                    </div>
                )}

                <form className="login-form">
                    <div className="form-group">
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className={`form-input ${errors.email ? "input-error" : ""}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {errors.email && <div className="field-error">{errors.email}</div>}
                    </div>

                    <div className="form-group">
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faLock} className="input-icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className={`form-input ${errors.password ? "input-error" : ""}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button 
                                type="button" 
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex="-1"
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
                        {errors.password && <div className="field-error">{errors.password}</div>}
                    </div>

                    <div className="form-group">
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faUserTie} className="input-icon" />
                            <select 
                                className={`form-input ${errors.role ? "input-error" : ""}`} 
                                value={role} 
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Select your role</option>
                                <option value="freelancer">Freelancer</option>
                                <option value="client">Client</option>
                            </select>
                        </div>
                        {errors.role && <div className="field-error">{errors.role}</div>}
                    </div>

                    <button 
                        type="submit" 
                        className="continue-button" 
                        onClick={handleLoginButton}
                        disabled={isLoading}
                    >
                        {isLoading ? "Processing..." : "Continue"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
