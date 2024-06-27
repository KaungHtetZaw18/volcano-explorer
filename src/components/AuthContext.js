import React, { createContext, useContext, useState } from 'react'; // Removed useEffect as it's not used

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [token, setTokenState] = useState(localStorage.getItem('authToken'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    const setToken = (newToken) => {
        localStorage.setItem('authToken', newToken);
        setTokenState(newToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setTokenState(null);
        setIsAuthenticated(false);
        console.clear(); 
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
