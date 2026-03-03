import React, { useState, useEffect } from 'react';
import NavigationBar from './Navbar';
import axios from 'axios';
import '../styles/data.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1234';

const Data = ({ isLoggedIn, user, onLogout }) => {
    const [healthData, setHealthData] = useState([]);
    const [formData, setFormData] = useState({
        weight: '',
        bloodPressure: '',
        heartRate: '',
        sleepPatterns: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isLoggedIn) {
            fetchHealthData();
        }
    }, [isLoggedIn]);

    const fetchHealthData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/api/health/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setHealthData(response.data);
        } catch (err) {
            console.error('Error fetching health data:', err);
            setError('Failed to load health data');
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert('Please login to track health data');
            return;
        }

        const { weight, bloodPressure, heartRate, sleepPatterns } = formData;
        if (!weight || !bloodPressure || !heartRate || !sleepPatterns) {
            alert('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });

            const entry = {
                weight: parseFloat(weight),
                bloodPressure: bloodPressure,
                heartRate: parseFloat(heartRate),
                sleepPatterns: sleepPatterns,
                date: formattedDate
            };

            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/api/health/save`, entry, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                setHealthData([...healthData, response.data.entry]);
                setFormData({
                    weight: '',
                    bloodPressure: '',
                    heartRate: '',
                    sleepPatterns: ''
                });
                alert('Health data saved successfully!');
            }
        } catch (err) {
            console.error('Error saving health data:', err);
            setError('Failed to save health data');
        } finally {
            setLoading(false);
        }
    };

    const getLatestValue = (field) => {
        if (healthData.length === 0) return 'N/A';
        const latest = healthData[healthData.length - 1];
        return latest[field] || 'N/A';
    };

    return (
        <>
            <NavigationBar isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} />
            
            <div className="container mt-4">
                {!isLoggedIn ? (
                    <div className="alert alert-warning">
                        Please login to track your health data
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleSubmit} className="data-form">
                            <h2>Track Your Health Data</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            
                            <div className="mb-3">
                                <label htmlFor="weight" className="form-label">Weight (kg):</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="weight"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleInputChange}
                                    placeholder="Enter weight"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="bloodPressure" className="form-label">Blood Pressure:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="bloodPressure"
                                    name="bloodPressure"
                                    value={formData.bloodPressure}
                                    onChange={handleInputChange}
                                    placeholder="Enter blood pressure (e.g., 120/80)"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="heartRate" className="form-label">Heart Rate (bpm):</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="heartRate"
                                    name="heartRate"
                                    value={formData.heartRate}
                                    onChange={handleInputChange}
                                    placeholder="Enter heart rate"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="sleepPatterns" className="form-label">Sleep Patterns (hours):</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="sleepPatterns"
                                    name="sleepPatterns"
                                    value={formData.sleepPatterns}
                                    onChange={handleInputChange}
                                    placeholder="Enter sleep hours"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Data'}
                            </button>
                        </form>

                        <div className="dashboard-container">
                            <div className="card health-widget">
                                <div className="card-body">
                                    <h5 className="card-title">Weight</h5>
                                    <p className="card-text">Latest: <span className="value">{getLatestValue('weight')}</span> kg</p>
                                </div>
                            </div>

                            <div className="card health-widget">
                                <div className="card-body">
                                    <h5 className="card-title">Blood Pressure</h5>
                                    <p className="card-text">Latest: <span className="value">{getLatestValue('bloodPressure')}</span></p>
                                </div>
                            </div>

                            <div className="card health-widget">
                                <div className="card-body">
                                    <h5 className="card-title">Heart Rate</h5>
                                    <p className="card-text">Latest: <span className="value">{getLatestValue('heartRate')}</span> BPM</p>
                                </div>
                            </div>

                            <div className="card health-widget">
                                <div className="card-body">
                                    <h5 className="card-title">Sleep Patterns</h5>
                                    <p className="card-text">Latest: <span className="value">{getLatestValue('sleepPatterns')}</span> Hours</p>
                                </div>
                            </div>
                        </div>

                        <div className="history-section">
                            <h3>Health Data History</h3>
                            <table className="table table-striped">
                                <thead className="table-primary">
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>Weight (kg)</th>
                                        <th>Blood Pressure</th>
                                        <th>Heart Rate (BPM)</th>
                                        <th>Sleep (Hours)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {healthData.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{entry.date}</td>
                                            <td>{entry.weight}</td>
                                            <td>{entry.bloodPressure}</td>
                                            <td>{entry.heartRate}</td>
                                            <td>{entry.sleepPatterns}</td>
                                        </tr>
                                    ))}
                                    {healthData.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="text-center">No data available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Data;