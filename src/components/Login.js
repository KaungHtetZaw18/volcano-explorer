import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './css/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
    
        try {
            const response = await fetch('http://4.237.58.241:3000/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to login. Please try again.');
            }
    
            console.log("Logged in successfully. Token:", data.token); // Log token first
            if (process.env.NODE_ENV === 'development') {
                console.log("Email:", email); // Log email in development mode only
                console.log("Password:", password); // Log password in development mode only
            }
            setToken(data.token);
            navigate('/');  // Redirect to home page or dashboard
            setLoading(false);
        } catch (error) {
            console.error("Login error:", error);
            setError(error.message);
            setLoading(false);
        }
    };
    

    return (
        <div className='container'>
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="login-input-group">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="login-input-group">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {error && <div className="login-error-message">{error}</div>}
            </form>
        </div>
        </div>
    );
};

export default Login;
