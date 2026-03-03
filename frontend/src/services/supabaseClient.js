// API service for backend communication
const API_URL = process.env.REACT_APP_API_URL || 'https://mediconnect-nb0z.onrender.com';

export const api = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    };
    
    const url = `${API_URL}${endpoint}`;
    console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`);
    
    try {
      const response = await fetch(url, {
        ...options,
        headers,
        mode: 'cors',
        credentials: 'include'
      });
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('❌ Non-JSON response:', text);
        throw new Error('Server returned non-JSON response');
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error('❌ API Error:', data);
        throw new Error(data.message || data.error || 'Request failed');
      }
      
      console.log('✅ API Success:', data);
      return data;
    } catch (error) {
      console.error('❌ Fetch Error:', error);
      throw error;
    }
  },
  
  get: (endpoint) => api.request(endpoint, { method: 'GET' }),
  post: (endpoint, body) => api.request(endpoint, { 
    method: 'POST', 
    body: JSON.stringify(body) 
  }),
  put: (endpoint, body) => api.request(endpoint, { 
    method: 'PUT', 
    body: JSON.stringify(body) 
  }),
  delete: (endpoint) => api.request(endpoint, { method: 'DELETE' })
};

// Test function to verify backend connection
export const testBackendConnection = async () => {
  try {
    const result = await api.get('/test');
    console.log('✅ Backend connection successful:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    return { success: false, error: error.message };
  }
};