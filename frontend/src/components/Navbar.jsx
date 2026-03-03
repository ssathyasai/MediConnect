import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ user, onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (onLogout) onLogout();
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#04364a' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">MediConnect</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">About Us</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                Services
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/mental-health">Mental Health</a></li>
                <li><a className="dropdown-item" href="/symptom-checker">Symptom Checker</a></li>
                <li><a className="dropdown-item" href="/health-data">Health Data</a></li>
                <li><a className="dropdown-item" href="/nutrition">Nutrition Planning</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/community">Community</a></li>
              </ul>
            </li>
          </ul>
          
          <form className="d-flex me-2">
            <input className="form-control me-2" type="search" placeholder="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          
          {user ? (
            <div className="dropdown">
              <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                {user.firstName} {user.lastName}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="/profile">Profile</a></li>
                <li><a className="dropdown-item" href="/health-data">My Health Data</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <a href="/login" className="btn btn-outline-light me-2">Login</a>
              <a href="/signup" className="btn btn-success">Sign Up</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;