import React from 'react';
import NavigationBar from '../components/Navbar';
import '../styles/main.css';

const Main = ({ isLoggedIn, user, onLogout }) => {
    return (
        <>
            <NavigationBar isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} />
            
            <div className="main-container">
                <h1>Welcome to MediConnect</h1>
                <p className="main-tagline">Your trusted partner in healthcare</p>
                
                <div className="features-grid">
                    <div className="feature-card" id="trans1">
                        <h3>Symptom Checker</h3>
                        <p>Check your symptoms and get insights</p>
                    </div>
                    
                    <div className="feature-card" id="trans2">
                        <h3>Mental Health</h3>
                        <p>Take mental health assessments</p>
                    </div>
                    
                    <div className="feature-card" id="trans3">
                        <h3>Health Data</h3>
                        <p>Track your health metrics</p>
                    </div>
                    
                    <div className="feature-card" id="trans4">
                        <h3>Nutrition Planning</h3>
                        <p>Get personalized meal plans</p>
                    </div>
                    
                    <div className="feature-card" id="trans5">
                        <h3>Community Chat</h3>
                        <p>Connect with others</p>
                    </div>
                    
                    <div className="feature-card" id="trans6">
                        <h3>About Us</h3>
                        <p>Learn about our mission</p>
                    </div>
                    
                    <div className="feature-card" id="trans7">
                        <h3>Contact</h3>
                        <p>Get in touch with us</p>
                    </div>
                    
                    <div className="feature-card" id="trans8">
                        <h3>24/7 Support</h3>
                        <p>We're here to help</p>
                    </div>
                </div>
                
                {isLoggedIn && (
                    <div className="welcome-user">
                        <h2>Welcome back, {user?.firstName}!</h2>
                        <p>Track your health journey with us</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Main;