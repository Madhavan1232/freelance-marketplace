import React, { useState, useEffect } from 'react';
import './Talents.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const coverColors = [
  '#2ecc71', '#3498db', '#9b59b6', '#e74c3c', '#f39c12',
  '#16a085', '#2c3e50', '#27ae60', '#8e44ad', '#c0392b'
];

function Talents() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const talentsPerPage = 6;

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/freelancer-profile');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const processedData = data.map((freelancer, index) => ({
          ...freelancer,
          coverColor: coverColors[index % coverColors.length],
          avatar: `https://ui-avatars.com/api/?name=${freelancer.firstname}+${freelancer.lastname}&background=random&color=fff&size=128`,
          skillsArray: freelancer.skills ? freelancer.skills.split(',').map(skill => skill.trim()) : []
        }));

        setFreelancers(processedData);
        setLoading(false);
      } catch (err) {
        console.log('Server is not connected');
        setError('Unable to load data');
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
    setCurrentPage(1);
  };
  
  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const filteredFreelancers = freelancers.filter(freelancer => {
    const searchTermLower = searchTerm.toLowerCase().trim();
    
    if (searchTermLower === '') return true;
    
    switch (searchCategory) {
      case 'name':
        return `${freelancer.firstname || ''} ${freelancer.lastname || ''}`.toLowerCase().includes(searchTermLower);
      case 'skills':
        return freelancer.skillsArray && freelancer.skillsArray.some(skill => 
          skill.toLowerCase().includes(searchTermLower)
        );
      case 'location':
        return freelancer.location && freelancer.location.toLowerCase().includes(searchTermLower);
      default: 
        return (
          `${freelancer.firstname || ''} ${freelancer.lastname || ''}`.toLowerCase().includes(searchTermLower) ||
          (freelancer.skillsArray && freelancer.skillsArray.some(skill => skill.toLowerCase().includes(searchTermLower))) ||
          (freelancer.location && freelancer.location.toLowerCase().includes(searchTermLower)) ||
          (freelancer.bio && freelancer.bio.toLowerCase().includes(searchTermLower))
        );
    }
  });

  const indexOfLastTalent = currentPage * talentsPerPage;
  const indexOfFirstTalent = indexOfLastTalent - talentsPerPage;
  const currentTalents = filteredFreelancers.slice(indexOfFirstTalent, indexOfLastTalent);
  const totalPages = Math.ceil(filteredFreelancers.length / talentsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', width: '100%', paddingTop: '20px', paddingBottom: '40px' }}>
      <div className="talents-container">
        <div className="talents-header">
          <h1 className="talents-title">Discover Top Talents</h1>
          <p className="talents-subtitle">
            Find skilled professionals for your projects from our global talent pool
          </p>
          
          <div className="talents-search-container">
            <div className="talents-search-box">
              <input 
                type="text" 
                placeholder="Search for talents..." 
                value={searchTerm}
                onChange={handleSearchChange}
                className="talents-search-input"
              />
              <div className="talents-search-icon">
                <FontAwesomeIcon icon={faSearch} />
              </div>
              {searchTerm && (
                <button onClick={clearSearch} className="talents-search-clear">
                  ×
                </button>
              )}
            </div>
            <div className="talents-search-category">
              <select 
                value={searchCategory} 
                onChange={handleCategoryChange}
                className="talents-search-select"
              >
                <option value="all">All Categories</option>
                <option value="name">Name</option>
                <option value="skills">Skills</option>
                <option value="location">Location</option>
              </select>
            </div>
          </div>
        </div>


        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <h3 style={{ color: '#2ecc71' }}>Loading talents...</h3>
            <p>Please wait while we fetch the freelancer data</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <h3 style={{ color: 'red' }}>Error loading talents</h3>
            <p>There was a problem fetching the freelancer data: {error}</p>
          </div>
        ) : currentTalents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <h3 style={{ color: '#2ecc71' }}>No talents found</h3>
            {searchTerm ? (
              <p>We couldn't find any freelancers matching your search criteria. Try adjusting your search or category.</p>
            ) : (
              <p>We couldn't find any freelancers at the moment. Please check back later.</p>
            )}
          </div>
        )
          : (
            <>
              {searchTerm && (
                <div className="search-results-count">
                  Found {filteredFreelancers.length} freelancer{filteredFreelancers.length !== 1 ? 's' : ''} 
                  {searchCategory !== 'all' ? ` in ${searchCategory}` : ''}
                </div>
              )}
              <div className="talents-grid">
              {currentTalents.map(freelancer => (
                <div key={freelancer.id} className="talent-card">
                  <div className="talent-header">
                    <div className="talent-cover" style={{ backgroundColor: freelancer.coverColor }}></div>
                    <img src={freelancer.avatar} alt='Not found' className="talent-avatar" />
                  </div>
                  <div className="talent-body">
                    <h3 className="talent-name">{freelancer.firstname} {freelancer.lastname}</h3>
                    <p className="talent-title">{freelancer.location}</p>
                    <p className="talent-description">{freelancer.bio}</p>
                    <div className="talent-skills">
                      {freelancer.skillsArray.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="talent-footer">
                    <div className="talent-rating">
                      <i className="fas fa-money-bill rating-star" style={{ color: '#2ecc71' }}></i>
                      <span>${freelancer.hourlyRate}/hr</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </>
          )}

        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Talents;