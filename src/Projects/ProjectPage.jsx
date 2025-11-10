import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectPage.css';

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    budget: '',
    requiredSkills: '',
    status: 'OPEN',
    clientId: '',
    assignedFreelancerId: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/projects');
      setProjects(response.data);
      setTotalPages(Math.ceil(response.data.length / projectsPerPage));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching projects:', err);

      if (err.code === 'ERR_NETWORK') {
        setError('Network Error: Cannot connect to the backend server. Make sure the server is running at http://localhost:8080');
      } else {
        setError(`Failed to fetch projects: ${err.message}`);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: name === 'budget' ? parseFloat(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8080/projects', newProject);
      console.log('Project created successfully:', response.data);

      setNewProject({
        title: '',
        description: '',
        budget: '',
        requiredSkills: '',
        status: 'OPEN',
        clientId: '',
        assignedFreelancerId: ''
      });

      setSuccess(`Project "${newProject.title}" created successfully!`);

      setShowForm(false);
      fetchProjects();
      setCurrentPage(1);

      setTimeout(() => {
        setSuccess('');
      }, 5000);
    } catch (err) {
      console.error('Error creating project:', err);
      if (err.code === 'ERR_NETWORK') {
        setError('Network Error: Cannot connect to the backend server. Make sure the server is running at http://localhost:8080');
      } else {
        setError(`Failed to create project: ${err.message}`);
      }
    }
  };

  return (
    <div className="project-page-container">

      <div className="create-project-container">
        <button
          className="create-project-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Create Project'}
        </button>
      </div>
      {showForm && (
        <div className="project-form-container">
          <h2>Create New Project</h2>
          <form onSubmit={handleSubmit}>
            <div className="project-form-field">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={newProject.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="project-form-field">
              <label>Description:</label>
              <textarea
                name="description"
                value={newProject.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="project-form-field">
              <label>Budget:</label>
              <input
                type="number"
                name="budget"
                value={newProject.budget}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="project-form-field">
              <label>Required Skills:</label>
              <textarea
                name="requiredSkills"
                value={newProject.requiredSkills}
                onChange={handleInputChange}
              />
            </div>

            <div className="project-form-field">
              <label>Status:</label>
              <select
                name="status"
                value={newProject.status}
                onChange={handleInputChange}
                required
              >
                <option value="OPEN">OPEN</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>

            <div className="project-form-field">
              <label>Client ID:</label>
              <input
                type="number"
                name="clientId"
                value={newProject.clientId}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="project-form-field">
              <label>Assigned Freelancer ID:</label>
              <input
                type="number"
                name="assignedFreelancerId"
                value={newProject.assignedFreelancerId}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {loading && <div className="loading-message">Loading projects...</div>}
      <div className="projects-table-container">
        <table className="projects-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Budget</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.length > 0 ? (
              currentProjects.map((project) => (
                <tr key={project.id}>
                  <td><strong style={{ color: 'black' }}>{project.title}</strong></td>
                  <td>{project.description}</td>
                  <td>{typeof project.budget === 'number' ? project.budget.toFixed(2) : project.budget}</td>
                  <td><span className={`status-${project.status.toLowerCase()}`}>{project.status}</span></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-projects">No projects available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <button
          onClick={previousPage}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectPage;