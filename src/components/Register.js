import React, { useState } from 'react';
import './css/Register.css'; // Import external CSS file for styling, ensuring it's specific to the Register component.

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading indicator
    const [message, setMessage] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading to true when registration starts

        // Ensure API URL is correct and operational
        const url = 'http://4.237.58.241:3000/user/register';

        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            setLoading(false); // Set loading to false if registration fails
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };

        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to register. Please try again.');
            }
            setMessage('Registration successful! Redirecting to login page...');
            setTimeout(() => {
                setLoading(false); // Set loading to false after 2 seconds
                setMessage('');
                setTimeout(() => {
                    window.location.href = '/login'; // Redirect to login page after 2 seconds
                }, 2000);
            }, 2000);
        } catch (error) {
            setMessage(error.message);
            setLoading(false); // Set loading to false if registration fails
        }
    };

    return (
        <div className='container'>
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="register-input-group">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email" // Placeholder added
                        required
                    />
                </div>
                <div className="register-input-group">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password" // Placeholder added
                        required
                    />
                </div>
                <div className="register-input-group">
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password" // Placeholder added
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
                {message && <p className="register-message">{message}</p>}
            </form>
        </div>
        </div>
    );
}

export default Register;
