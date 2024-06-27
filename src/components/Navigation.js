import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './css/Navigation.css';

const Navigation = () => {
    const { isAuthenticated, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [activeItem, setActiveItem] = useState('');
    const location = useLocation();
    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        setActiveItem(location.pathname);
    }, [location.pathname]);

    const handleLogout = () => {
        setLoading(true);
        setTimeout(() => {
            logout();  // Perform the logout operation
            setLoading(false);
            navigate('/login'); // Navigate to login page after logout
        }, 1000);  // Delay for simulating logout process
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link className={`navbar-brand ${activeItem === '/' ? 'active' : ''}`} to="/">
                    Volcanoes
                </Link>
                <ul className="nav-links">
                    <li className={`nav-item ${activeItem === '/' ? 'active' : ''}`}>
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className={`nav-item ${activeItem === '/volcano-list' ? 'active' : ''}`}>
                        <Link className="nav-link" to="/volcano-list">Volcano List</Link>
                    </li>
                    {isAuthenticated ? (
                        <li className={`nav-item ${loading ? 'disabled' : ''}`}>
                            <Link to="#" className="nav-link logout-button" onClick={handleLogout}>
                                {loading ? 'Logging out...' : 'Logout'}
                            </Link>
                        </li>
                    ) : (
                        <>
                            <li className={`nav-item ${activeItem === '/register' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            <li className={`nav-item ${activeItem === '/login' ? 'active' : ''}`}>
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
