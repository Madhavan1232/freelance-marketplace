import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileAvatar.css';
import { logoutUser, getUserEmail, fetchUserData } from '../utils/authUtils';

const ProfileAvatar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const email = getUserEmail() || 'user@example.com';
    const initials = email.charAt(0).toUpperCase();

    useEffect(() => {
        const loadUserData = async () => {
            const userDataResult = await fetchUserData(email);
            if (userDataResult) {
                setUserData(userDataResult);
            }
        };

        loadUserData();
    }, [email]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        logoutUser();
        navigate('/');
        window.location.reload();
    };

    return (
        <div className="profile-avatar-container">
            <button
                className="avatar-button"
                onClick={toggleDropdown}
                aria-label="User profile"
            >
                {userData?.profilePicture ? (
                    <img
                        src={"#0a0a0a" + userData.profilePicture}
                        alt="Profile"
                        className="avatar-image"
                    />
                ) : (
                    <div className="avatar">{initials}</div>
                )}
            </button>

            {dropdownOpen && (
                <div className="profile-dropdown">
                    <div className="dropdown-header">
                        <span className="user-email">{userData?.name || email}</span>
                        <span className="user-role">{userData?.role?.toLowerCase() || ''}</span>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout-item" onClick={handleLogout}>
                        Log Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileAvatar;