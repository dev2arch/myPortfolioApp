import axios from 'axios';

// Get backend URL from environment
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE_URL = `${BACKEND_URL}/api`;

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens (if needed in future)
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      console.error(`API Error ${status}:`, data);
      
      // Handle specific error codes
      switch (status) {
        case 400:
          throw new Error(data.detail || 'Bad request');
        case 404:
          throw new Error('Resource not found');
        case 500:
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error(data.detail || 'An error occurred');
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.request);
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      console.error('Error:', error.message);
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
);

// API Methods

// Contact Form API
export const contactApi = {
  // Submit contact form
  submitContactForm: async (contactData) => {
    const response = await api.post('/contact', contactData);
    return response.data;
  },

  // Get all contact submissions (admin)
  getContactSubmissions: async () => {
    const response = await api.get('/contact');
    return response.data;
  },

  // Get specific contact submission
  getContactSubmission: async (id) => {
    const response = await api.get(`/contact/${id}`);
    return response.data;
  },
};

// Blog Posts API
export const blogApi = {
  // Get all blog posts with filtering
  getBlogPosts: async (params = {}) => {
    const response = await api.get('/blog-posts', { params });
    return response.data;
  },

  // Get featured blog posts
  getFeaturedBlogPosts: async () => {
    const response = await api.get('/blog-posts/featured');
    return response.data;
  },

  // Get blog categories
  getBlogCategories: async () => {
    const response = await api.get('/blog-posts/categories');
    return response.data;
  },

  // Get specific blog post
  getBlogPost: async (id) => {
    const response = await api.get(`/blog-posts/${id}`);
    return response.data;
  },

  // Create new blog post
  createBlogPost: async (blogData) => {
    const response = await api.post('/blog-posts', blogData);
    return response.data;
  },

  // Update blog post
  updateBlogPost: async (id, blogData) => {
    const response = await api.put(`/blog-posts/${id}`, blogData);
    return response.data;
  },

  // Delete blog post
  deleteBlogPost: async (id) => {
    const response = await api.delete(`/blog-posts/${id}`);
    return response.data;
  },
};

// Resume API
export const resumeApi = {
  // Get resume data
  getResume: async () => {
    const response = await api.get('/resume');
    return response.data;
  },

  // Update resume data
  updateResume: async (resumeData) => {
    const response = await api.put('/resume', resumeData);
    return response.data;
  },

  // Download resume (placeholder for future implementation)
  downloadResume: async () => {
    // This would typically return a blob or redirect to download URL
    const response = await api.get('/resume/download', {
      responseType: 'blob',
    });
    return response.data;
  },
};

// Statistics API
export const statisticsApi = {
  // Get statistics
  getStatistics: async () => {
    const response = await api.get('/statistics');
    return response.data;
  },

  // Update statistics
  updateStatistics: async (statsData) => {
    const response = await api.put('/statistics', statsData);
    return response.data;
  },
};

// Testimonials API
export const testimonialsApi = {
  // Get testimonials
  getTestimonials: async (params = {}) => {
    const response = await api.get('/testimonials', { params });
    return response.data;
  },

  // Create testimonial
  createTestimonial: async (testimonialData) => {
    const response = await api.post('/testimonials', testimonialData);
    return response.data;
  },

  // Update testimonial
  updateTestimonial: async (id, testimonialData) => {
    const response = await api.put(`/testimonials/${id}`, testimonialData);
    return response.data;
  },

  // Delete testimonial
  deleteTestimonial: async (id) => {
    const response = await api.delete(`/testimonials/${id}`);
    return response.data;
  },
};

// General API health check
export const healthCheck = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

// Export the axios instance for direct use if needed
export default api;