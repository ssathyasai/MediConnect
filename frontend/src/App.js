import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Community from './components/Community';
import HealthData from './components/Data';
import Login from './components/Login';
import Meal from './components/Meal';
import MentalHealth from './components/MentalHealth';
import Signup from './components/Signup';
import Symptom from './components/Symptom';
import Main from './pages/Main';
import { api } from './services/supabaseClient';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      
      // Verify token with backend
      api.get('/me')
        .then(data => {
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
        })
        .catch(() => {
          // Token invalid, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/community" element={user ? <Community /> : <Navigate to="/login" />} />
        <Route path="/health-data" element={user ? <HealthData /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/nutrition" element={<Meal />} />
        <Route path="/mental-health" element={<MentalHealth />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/symptom-checker" element={<Symptom />} />
      </Routes>
    </Router>
  );
}

export default App;