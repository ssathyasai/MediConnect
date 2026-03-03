import React, { useState, useEffect } from 'react';
import { api } from '../services/supabaseClient';
import 'bootstrap/dist/css/bootstrap.min.css';

const HealthData = () => {
  const [healthData, setHealthData] = useState([]);
  const [formData, setFormData] = useState({
    weight: '',
    bloodPressure: '',
    heartRate: '',
    sleepPatterns: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchHealthData();
  }, []);

  const fetchHealthData = async () => {
    try {
      setLoading(true);
      const data = await api.get('/getHealthData');
      setHealthData(data);
    } catch (err) {
      setError('Failed to fetch health data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!formData.weight || !formData.bloodPressure || !formData.heartRate || !formData.sleepPatterns) {
      setError('Please fill all fields');
      return;
    }
    
    try {
      setLoading(true);
      const result = await api.post('/saveHealthData', formData);
      
      // Add new data to list
      setHealthData([result.entry, ...healthData]);
      
      // Reset form
      setFormData({
        weight: '',
        bloodPressure: '',
        heartRate: '',
        sleepPatterns: ''
      });
      
      setSuccess('Health data saved successfully!');
    } catch (err) {
      setError('Failed to save health data: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    
    try {
      await api.delete(`/deleteHealthData/${id}`);
      setHealthData(healthData.filter(item => item.id !== id));
      setSuccess('Entry deleted successfully');
    } catch (err) {
      setError('Failed to delete entry');
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Health Data Tracker</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Add New Health Data</h5>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label htmlFor="weight" className="form-label">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Enter weight"
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="bloodPressure" className="form-label">Blood Pressure</label>
                <input
                  type="text"
                  className="form-control"
                  id="bloodPressure"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleChange}
                  placeholder="e.g., 120/80"
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="heartRate" className="form-label">Heart Rate (BPM)</label>
                <input
                  type="number"
                  className="form-control"
                  id="heartRate"
                  name="heartRate"
                  value={formData.heartRate}
                  onChange={handleChange}
                  placeholder="Enter heart rate"
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="sleepPatterns" className="form-label">Sleep Patterns</label>
                <input
                  type="text"
                  className="form-control"
                  id="sleepPatterns"
                  name="sleepPatterns"
                  value={formData.sleepPatterns}
                  onChange={handleChange}
                  placeholder="e.g., 7-8 hours"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Data'}
            </button>
          </form>
        </div>
      </div>
      
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Health History</h5>
          {loading && healthData.length === 0 ? (
            <p className="text-center">Loading...</p>
          ) : healthData.length === 0 ? (
            <p className="text-center text-muted">No health data recorded yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-primary">
                  <tr>
                    <th>Date</th>
                    <th>Weight (kg)</th>
                    <th>Blood Pressure</th>
                    <th>Heart Rate (BPM)</th>
                    <th>Sleep Patterns</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {healthData.map((entry) => (
                    <tr key={entry.id}>
                      <td>{new Date(entry.recorded_at).toLocaleDateString()}</td>
                      <td>{entry.weight}</td>
                      <td>{entry.blood_pressure}</td>
                      <td>{entry.heart_rate}</td>
                      <td>{entry.sleep_patterns}</td>
                      <td>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(entry.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthData;