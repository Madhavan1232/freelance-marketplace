
import axios from 'axios';

const setUserLoggedIn = (email, role = null) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userRole', role);
    
};

const logoutUser = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
};

const isUserLoggedIn = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
};

const getUserEmail = () => {
    return localStorage.getItem('userEmail');
};

const fetchUserData = async (email) => {
    try {
        const response = await axios.get(`http://localhost:8080/users/getUserByEmail?email=${encodeURIComponent(email)}`);
        if (response.data) {
            return response.data;
        }
        return null;
    } catch (error) {
        return null;
    }
};


export {
    setUserLoggedIn,
    logoutUser,
    isUserLoggedIn,
    getUserEmail,
    fetchUserData,
};