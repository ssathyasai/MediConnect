import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = () => {
  const services = [
    {
      title: 'Mental Health',
      description: 'Take mental health assessments and access resources for emotional well-being.',
      icon: '🧠',
      link: '/mental-health',
      color: '#ff69b4'
    },
    {
      title: 'Symptom Checker',
      description: 'Check your symptoms and get possible conditions with probability analysis.',
      icon: '🔍',
      link: '/symptom-checker',
      color: '#4CAF50'
    },
    {
      title: 'Health Data',
      description: 'Track your weight, blood pressure, heart rate, and sleep patterns.',
      icon: '📊',
      link: '/health-data',
      color: '#2196F3'
    },
    {
      title: 'Nutrition Planning',
      description: 'Get personalized meal plans based on your BMI and health goals.',
      icon: '🥗',
      link: '/nutrition',
      color: '#FF9800'
    },
    {
      title: 'Community',
      description: 'Connect with others, share experiences, and get support.',
      icon: '👥',
      link: '/community',
      color: '#9C27B0'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5" style={{ background: 'linear-gradient(135deg, #04364a 0%, #176B87 100%)' }}>
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-4">Welcome to MediConnect</h1>
          <p className="lead mb-4">Your comprehensive healthcare companion for mental wellness, symptom checking, health tracking, and nutrition planning.</p>
          <a href="/signup" className="btn btn-light btn-lg px-5 me-3">Get Started</a>
          <a href="/about" className="btn btn-outline-light btn-lg px-5">Learn More</a>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5" style={{ color: '#04364a', fontFamily: 'Cabin, sans-serif' }}>Our Services</h2>
          <div className="row g-4">
            {services.map((service, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border-0" style={{ 
                  transition: 'transform 0.3s',
                  cursor: 'pointer',
                  backgroundColor: '#d2e0fb'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div className="card-body text-center">
                    <div className="display-1 mb-3">{service.icon}</div>
                    <h5 className="card-title mb-3" style={{ color: service.color }}>{service.title}</h5>
                    <p className="card-text">{service.description}</p>
                    <a href={service.link} className="btn btn-primary mt-3">Learn More</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5" style={{ color: '#04364a', fontFamily: 'Cabin, sans-serif' }}>Why Choose MediConnect?</h2>
          <div className="row">
            <div className="col-md-4 text-center mb-4">
              <div className="display-4 text-primary mb-3">🔒</div>
              <h5>Secure & Private</h5>
              <p className="text-muted">Your health data is encrypted and protected with industry-standard security.</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="display-4 text-primary mb-3">📱</div>
              <h5>User-Friendly</h5>
              <p className="text-muted">Intuitive interface designed for easy navigation and accessibility.</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="display-4 text-primary mb-3">🔄</div>
              <h5>Real-Time Tracking</h5>
              <p className="text-muted">Monitor your health metrics with real-time updates and history tracking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{ backgroundColor: '#b6fffa' }}>
        <div className="container text-center">
          <h2 className="mb-4" style={{ color: '#04364a' }}>Ready to take control of your health?</h2>
          <p className="lead mb-4">Join thousands of users who are already using MediConnect to improve their well-being.</p>
          <a href="/signup" className="btn btn-success btn-lg px-5">Sign Up Now</a>
        </div>
      </section>
    </div>
  );
};

export default Main;