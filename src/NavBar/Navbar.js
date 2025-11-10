import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../NavBar/navbar.css";
import { isUserLoggedIn } from '../utils/authUtils';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';


function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
    
    const handleStorageChange = () => {
      setIsLoggedIn(isUserLoggedIn());
    };
    
    const handleLogin = () => {
      setIsLoggedIn(isUserLoggedIn());
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLogin', handleLogin);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogin', handleLogin);
    };
  }, []);
  
  
  const handleSignupButton = () => {
    navigate('/signup');
  }


  const handleHomeButton = () => {
    navigate('/');
  }
    
  return (
    <div className="parent">
      <nav className="navbar" role="navigation" aria-label="main navigation" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="navbar-start">
          <h1 style={{ color: 'white', fontWeight: 'bold', fontSize: '25px' }} className="navbar-item">Flexora</h1>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" onClick={handleHomeButton}>
              Home
            </a>
            <a className="navbar-item" onClick={() => navigate('/projects')}>
              Projects
            </a>
            <a className="navbar-item" onClick={() => navigate('/talents')}>
              Talents
            </a>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                More  
              </a>

              <div className="navbar-dropdown">
                <a className="navbar-item" onClick={() => navigate('/about')}>
                  About
                </a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {isLoggedIn ? (
                <ProfileAvatar />
              ) : (
                <div className="buttons">
                  <button onClick={() => navigate('/login')} style={{ marginRight: '18px', color: 'white' }}>Log in</button>
                  <button onClick={handleSignupButton} className='singup-button'>
                    <p>Sign Up</p>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;