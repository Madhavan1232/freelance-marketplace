import React from 'react';
import './About.css';

function About() {
  return (
    <div style={{backgroundColor: '#0a0a0a', minHeight: '100vh', width: '100%', paddingTop: '20px', paddingBottom: '40px'}}>
      <div className="about-container">
        <div className="about-header">
          <h1 className="about-title">About Flexora</h1>
          <p className="about-subtitle">
            Connecting talented freelancers with innovative projects worldwide
          </p>
        </div>

      <div className="about-section">
        <h2 className="section-title">Our Mission</h2>
        <div className="about-content">
          <p>
            At Flexora, we're committed to revolutionizing the way professionals connect, collaborate, and create in the digital economy. 
            Our marketplace serves as a bridge between talented freelancers and businesses seeking specialized skills for their projects.
          </p>
          <p>
            Founded in 2025, Flexora was born from the recognition that the future of work is flexible, borderless, and skills-based. 
            We believe that everyone deserves the opportunity to showcase their talents and find meaningful work, regardless of location or background.
          </p>
        </div>
      </div>

      <div className="about-section">
        <h2 className="section-title">What Makes Us Different</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3 className="feature-title">Skill-Based Matching</h3>
            <p className="feature-description">
              Our intelligent algorithm matches freelancers with projects that align perfectly with their skills and experience, ensuring optimal outcomes for both parties.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Secure Payments</h3>
            <p className="feature-description">
              Our escrow payment system ensures that freelancers get paid for their work and clients receive the quality they expect before releasing funds.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Global Talent Pool</h3>
            <p className="feature-description">
              Access skilled professionals from around the world, bringing diverse perspectives and specialized expertise to your projects.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Project Management Tools</h3>
            <p className="feature-description">
              Built-in collaboration features make it easy to communicate, share files, and track progress throughout the lifecycle of your project.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Verified Profiles</h3>
            <p className="feature-description">
              We verify the identity and credentials of our freelancers, giving you confidence in the professionals you hire.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Fair Opportunities</h3>
            <p className="feature-description">
              We promote a level playing field where freelancers are evaluated based on their skills and performance, not just their rates or location.
            </p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2 className="section-title">How It Works</h2>
        <div className="about-content">
          <p>
            <strong>For Clients:</strong> Post your project, review proposals from qualified freelancers, select the best match, 
            collaborate through our platform, and release payment when satisfied with the work.
          </p>
          <p>
            <strong>For Freelancers:</strong> Create a compelling profile showcasing your skills and experience, 
            browse available projects, submit proposals for work that matches your expertise, deliver quality work, 
            and build your reputation through client reviews.
          </p>
        </div>
      </div>

      <div className="about-section team-section">
        <h2 className="section-title">Our Values</h2>
        <div className="about-content">
          <p>At Flexora, we're guided by these core principles:</p>
          <ul style={{ textAlign: 'left', maxWidth: '800px', margin: '20px auto', lineHeight: '1.8' }}>
            <li><strong>Quality:</strong> We believe in delivering excellence in every interaction and outcome.</li>
            <li><strong>Transparency:</strong> We foster trust through open communication and clear expectations.</li>
            <li><strong>Innovation:</strong> We continuously evolve our platform to better serve our community.</li>
            <li><strong>Inclusivity:</strong> We celebrate diversity and create opportunities for talent worldwide.</li>
            <li><strong>Empowerment:</strong> We enable professionals to take control of their careers and businesses to access the skills they need.</li>
          </ul>
        </div>
      </div>

      <div className="about-section">
        <h2 className="section-title">Contact Us</h2>
        <div className="contact-info">
          <p style={{marginBottom: '20px'}}>Have questions or suggestions? We'd love to hear from you!</p>
          
          <div className="contact-item" style={{display: 'flex', alignItems: 'center', marginBottom: '15px'}}>
            <div style={{width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1a1a1a', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '15px', border: '2px solid #2ecc71'}}>
              <i className="fas fa-envelope" style={{color: '#2ecc71', fontSize: '18px'}}></i>
            </div>
            <div>
              <p style={{margin: '0', fontWeight: 'bold'}}>Email</p>
              <p style={{margin: '0'}}>madhavanvairavan3@gmail.com</p>
            </div>
          </div>
          
          <div className="contact-item" style={{display: 'flex', alignItems: 'center', marginBottom: '15px'}}>
            <div style={{width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1a1a1a', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '15px', border: '2px solid #2ecc71'}}>
              <i className="fas fa-phone" style={{color: '#2ecc71', fontSize: '18px'}}></i>
            </div>
            <div>
              <p style={{margin: '0', fontWeight: 'bold'}}>Phone</p>
              <p style={{margin: '0'}}>+91 9342258045</p>
            </div>
          </div>
          
          <div className="contact-item" style={{display: 'flex', alignItems: 'center'}}>
            <div style={{width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1a1a1a', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '15px', border: '2px solid #2ecc71'}}>
              <i className="fab fa-github" style={{color: '#2ecc71', fontSize: '18px'}}></i>
            </div>
            <div>
              <p style={{margin: '0', fontWeight: 'bold'}}>GitHub</p>
              <a href="https://github.com/dashboard" style={{color: '#2ecc71', textDecoration: 'none', margin: '0'}}>github.com/dashboard</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default About;