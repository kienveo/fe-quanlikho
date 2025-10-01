// Mock axios instance cho development không cần API thật
import { getToken } from '../utils/auth';

const mockAxiosInstance = {
  get: async (url, config = {}) => {
    // Mock response cho các API calls
    console.log(`Mock GET: ${url}`, config);
    
    // Mock user info
    if (url.includes('/auth/aboutme')) {
      const user = JSON.parse(localStorage.getItem('authUser') || '{}');
      return {
        data: {
          status: 200,
          data: user.name || user.username || 'Mock User'
        }
      };
    }
    
    // Mock other API responses
    return {
      data: {
        status: 200,
        data: [],
        message: 'Mock response'
      }
    };
  },
  
  post: async (url, data = {}, config = {}) => {
    console.log(`Mock POST: ${url}`, data, config);
    
    // Mock logout
    if (url.includes('/auth/logout')) {
      return {
        data: {
          status: 200,
          message: 'Logout successful'
        }
      };
    }
    
    return {
      data: {
        status: 200,
        data: {},
        message: 'Mock response'
      }
    };
  },
  
  put: async (url, data = {}, config = {}) => {
    console.log(`Mock PUT: ${url}`, data, config);
    return {
      data: {
        status: 200,
        data: {},
        message: 'Mock response'
      }
    };
  },
  
  delete: async (url, config = {}) => {
    console.log(`Mock DELETE: ${url}`, config);
    return {
      data: {
        status: 200,
        message: 'Mock response'
      }
    };
  },
  
  // Add interceptors property for compatibility
  interceptors: {
    request: {
      use: () => {},
      eject: () => {}
    },
    response: {
      use: () => {},
      eject: () => {}
    }
  }
};

export default mockAxiosInstance;
