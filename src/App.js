import { Routes, Route } from 'react-router-dom';
import Navbar from './NavBar/Navbar';
import Home from './Home/Home';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import PasswordPage from './PasswordPage/PasswordPage';
import ProjectPage from './Projects/ProjectPage';
import FreelancerProfile from './FreelancerProfile/FreelancerProfile';
import About from './About/About';
import Talents from './Talents/Talents';

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password" element={<PasswordPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/freelancer-profile" element={<FreelancerProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/talents" element={<Talents />} />
      </Routes>
    </div>
  );
}

export default App;
