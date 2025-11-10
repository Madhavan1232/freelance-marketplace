import React, { useState } from 'react';
import './FreelancerProfile.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMapMarkerAlt, faDollarSign, faCode, faBriefcase, faGlobe, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function FreelancerProfile() {
    const navigate = useNavigate();
    
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [bio, setBio] = useState('');
    const [hourlyRate, setHourlyRate] = useState('');
    const [location, setLocation] = useState('');
    const [skills, setSkills] = useState('');
    const [portfolio, setPortfolio] = useState('');
    const [portfolioUrl, setPortfolioUrl] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post("http://localhost:8080/freelancer-profile", {
                firstname: firstname,
                lastname: lastname,
                bio: bio,
                hourlyRate: hourlyRate,
                location: location,
                skills: skills,
                portfolio: portfolio,
                portfolioUrl: portfolioUrl
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log("Freelancer profile created successfully:", response.data);
            navigate("/");
        } catch (error) {
            console.error("Error creating freelancer profile:", error);
        }
    };
    
    return (
        <div className="freelancer-profile-container">
            <div className="freelancer-profile-box">
                <div className="logo">
                    <h1>Flexora</h1>
                </div>
                
                <h2 className="profile-title">Complete Your Freelancer Profile</h2>
                
                <form className="freelancer-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="input-field">
                            <div className="input-with-icon">
                                <FontAwesomeIcon icon={faUser} className="input-icon" />
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="form-input"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="input-field">
                            <div className="input-with-icon">
                                <FontAwesomeIcon icon={faUser} className="input-icon" />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="form-input"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="input-field">
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faQuoteLeft} className="input-icon" />
                            <textarea
                                placeholder="Tell us about yourself and your experience"
                                className="form-input textarea-input"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows="4"
                            />
                        </div>
                    </div>
                    
                    <div className="input-field">
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faDollarSign} className="input-icon" />
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="Hourly Rate ($)"
                                className="form-input"
                                value={hourlyRate}
                                onChange={(e) => setHourlyRate(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="input-field">
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="input-icon" />
                            <input
                                type="text"
                                placeholder="Location"
                                className="form-input"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="input-field">
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faCode} className="input-icon" />
                            <textarea
                                placeholder="Skills (e.g. Writing content, Drawing, Full-stack development , creative design)"
                                className="form-input textarea-input"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                rows="3"
                            />
                        </div>
                    </div>
                    
                    <div className="input-field">
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faBriefcase} className="input-icon" />
                            <textarea
                                placeholder="Portfolio description"
                                className="form-input textarea-input"
                                value={portfolio}
                                onChange={(e) => setPortfolio(e.target.value)}
                                rows="3"
                            />
                        </div>
                    </div>
                    
                    <div className="input-field">
                        <div className="input-with-icon">
                            <FontAwesomeIcon icon={faGlobe} className="input-icon" />
                            <input
                                type="url"
                                placeholder="Portfolio URL"
                                className="form-input"
                                value={portfolioUrl}
                                onChange={(e) => setPortfolioUrl(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <button type="submit" className="submit-button">
                        Complete Profile
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FreelancerProfile;