import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import About from './components/About';
import Community from './components/Community';
import Data from './components/Data';
import Login from './components/Login';
import Meal from './components/Meal';
import MentalHealth from './components/MentalHealth';
import Signup from './components/Signup';
import Symptom from './components/Symptom';
import './index.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if (token && savedUser) {
            setIsLoggedIn(true);
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogin = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <Main 
                        isLoggedIn={isLoggedIn} 
                        user={user} 
                        onLogout={handleLogout} 
                    />
                } />
                <Route path="/about" element={
                    <About 
                        isLoggedIn={isLoggedIn} 
                        user={user} 
                        onLogout={handleLogout} 
                    />
                } />
                <Route path="/community" element={
                    <Community 
                        isLoggedIn={isLoggedIn} 
                        user={user} 
                        onLogout={handleLogout} 
                    />
                } />
                <Route path="/data" element={
                    <Data 
                        isLoggedIn={isLoggedIn} 
                        user={user} 
                        onLogout={handleLogout} 
                    />
                } />
                <Route path="/login" element={
                    isLoggedIn ? 
                    <Navigate to="/" /> : 
                    <Login onLogin={handleLogin} />
                } />
                <Route path="/meal" element={
                    <Meal 
                        isLoggedIn={isLoggedIn} 
                        user={user} 
                        onLogout={handleLogout} 
                    />
                } />
                <Route path="/mentalhealth" element={
                    <MentalHealth 
                        isLoggedIn={isLoggedIn} 
                        user={user} 
                        onLogout={handleLogout} 
                    />
                } />
                <Route path="/signup" element={
                    isLoggedIn ? 
                    <Navigate to="/" /> : 
                    <Signup onLogin={handleLogin} />
                } />
                <Route path="/symptom" element={
                    <Symptom 
                        isLoggedIn={isLoggedIn} 
                        user={user} 
                        onLogout={handleLogout} 
                    />
                } />
            </Routes>
        </Router>
    );
}

export default App;