import { Router, Routes, Route } from 'react-router-dom';
import Navbar from './NavBar/Navbar.js';
import Home from './Home/Home.jsx';
import Signup from './Signup/Signup.jsx';
import Login from './Login/Login.jsx';
import PasswordPage from './PasswordPage/PasswordPage.jsx';
import ProjectPage from './Projects/ProjectPage.jsx';
import FreelancerProfile from './FreelancerProfile/FreelancerProfile.jsx';
import About from './About/About.jsx';
import Talents from './Talents/Talents.jsx';
function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Login />} />
          <Route path='/login' element={<Signup />} />
          <Route path='/password' element={<PasswordPage />} />
          <Route path='/projects' element={<ProjectPage />} />
          <Route path='/freelancer-profile' element={<FreelancerProfile />} />
          <Route path='/about' element={<About />} />
          <Route path='/talents' element={<Talents />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
