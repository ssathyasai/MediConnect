import { getCurrentUser, requireAuth } from './auth.js';
import { CONFIG } from './config.js';

const API_URL = CONFIG.API_URL;

// Global variable to store health data
let healthData = [];
let user = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    user = requireAuth();
    if (user) {
        displayUserInfo();
        fetchHealthData();
    }
});

// Display user info
function displayUserInfo() {
    const userElement = document.getElementById('userEmail');
    if (userElement) {
        userElement.textContent = `${user.firstName || user.email}`;
    }
}

// Fetch health data from server
async function fetchHealthData() {
    try {
        showLoading(true);
        const response = await fetch(`${API_URL}/health-data/${user.id}`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        healthData = data || [];
        updateDashboardValues();
        updateHealthTable();
    } catch (error) {
        console.error('Error fetching health data:', error);
        showNotification('Error loading health data', 'error');
    } finally {
        showLoading(false);
    }
}

// Track new health data
async function trackHealthData() {
    const weight = document.getElementById('weight')?.value;
    const bloodPressure = document.getElementById('bloodPressure')?.value;
    const heartRate = document.getElementById('heartRate')?.value;
    const sleepPatterns = document.getElementById('sleepPatterns')?.value;

    if (!weight || !bloodPressure || !heartRate || !sleepPatterns) {
        showNotification('Please fill in all fields', 'warning');
        return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    const entry = {
        userId: user.id,
        weight: parseFloat(weight),
        bloodPressure: bloodPressure,
        heartRate: parseInt(heartRate),
        sleepPatterns: sleepPatterns,
        date: formattedDate
    };

    try {
        showLoading(true);
        const response = await fetch(`${API_URL}/health-data`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(entry)
        });

        if (!response.ok) {
            throw new Error('Failed to save data');
        }
        
        const result = await response.json();
        healthData.push(result.entry);
        updateDashboardValues();
        updateHealthTable();
        document.getElementById('trackingForm')?.reset();
        showNotification('Health data saved successfully', 'success');
    } catch (error) {
        console.error('Error saving data:', error);
        showNotification('Error saving data. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

// Update dashboard values
function updateDashboardValues() {
    if (healthData.length > 0) {
        const latest = healthData[healthData.length - 1];
        
        const weightEl = document.getElementById('weightValue');
        const bpEl = document.getElementById('bloodPressureValue');
        const hrEl = document.getElementById('heartRateValue');
        const sleepEl = document.getElementById('sleepPatternsValue');
        
        if (weightEl) weightEl.innerText = latest.weight || 'N/A';
        if (bpEl) bpEl.innerText = latest.blood_pressure || 'N/A';
        if (hrEl) hrEl.innerText = latest.heart_rate || 'N/A';
        if (sleepEl) sleepEl.innerText = latest.sleep_patterns || 'N/A';
    }
}

// Update health table
function updateHealthTable() {
    const tableBody = document.getElementById('healthTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (healthData.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="6" class="text-center">No health data available</td>';
        tableBody.appendChild(row);
        return;
    }
    
    healthData.forEach((entry, index) => {
        const row = document.createElement('tr');
        const dateDisplay = entry.date || new Date(entry.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${dateDisplay}</td>
            <td>${entry.weight}</td>
            <td>${entry.blood_pressure}</td>
            <td>${entry.heart_rate}</td>
            <td>${entry.sleep_patterns}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Show loading indicator
function showLoading(show) {
    const loadingEl = document.getElementById('loadingIndicator');
    if (loadingEl) {
        loadingEl.style.display = show ? 'block' : 'none';
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Export functions for global use
window.trackHealthData = trackHealthData;
window.logout = logout;