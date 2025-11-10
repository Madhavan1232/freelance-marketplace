import React, { useState } from "react";
import Navbar from "../NavBar/Navbar";
import "../Home/Home.css"
import ListOfProps from "../PropsOfFM/ListOfProps";
import SearchBar from "../SearchBar/Bar.jsx";
function Home() {
    return (
        <div className="parent">
            <div className="navbar-container">
                <div className="parent-navbar">
                    <div className="navbar-content">
                        <Navbar />
                    </div>
                </div>
                <div className="home-container">
                    <div className="image-wrapper">
                        <img src="/image1.png" alt="Description of image" />
                        <div className="overlay-text">
                            <p>Where Skills Meet</p>
                            <p>Opportunities, Shaping the</p>
                            <p>Future of Work Together</p>
                        </div>
                        <SearchBar className="search-bar" />
                    </div>
                </div>
                <div className="info-section">
                    <ListOfProps />
                </div>
            </div>
        </div>
    );
}

export default Home;    