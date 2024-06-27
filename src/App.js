import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Footer from './components/Footer';
import Home from './components/Home';
import VolcanoDetail from './components/VolcanoDetail';
import VolcanoList from './components/VolcanoList'; // Make sure this component exists
import Register from './components/Register';       // Make sure this component exists
import Login from './components/Login';             // Make sure this component exists
import Navigation from './components/Navigation';


const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Navigation />
                    <main style={{ flex: '1' }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/volcano-list" element={<VolcanoList />} />
                            <Route path="/volcano/:volcanoId" element={<VolcanoDetail />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;