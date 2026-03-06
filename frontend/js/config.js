// API Configuration for MediConnect
// This file determines which backend URL to use based on the environment

// Detect if we're running in development (localhost) or production
const isDevelopment = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1';

// Set the API URL based on environment
const CONFIG = {
    // Backend API URL
    API_URL: isDevelopment 
        ? 'http://localhost:1234/api'                    // Local development
        : 'https://mediconnect-backend-zpnn.onrender.com',   // Your deployed backend
        
    // App name
    APP_NAME: 'MediConnect',
    
    // App version
    VERSION: '1.0.0',
    
    // Feature flags
    FEATURES: {
        enableChat: true,
        enableHealthTracking: true,
        enableMentalHealth: true
    }
};

// Export for use in other files (for module systems)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}