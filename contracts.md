# API Contracts & Backend Integration Protocol

## Overview
This document defines the API contracts and integration protocol for Dewanshu Singh Sisaudiya's portfolio website. It outlines what's currently mocked in the frontend and what needs to be implemented in the backend.

## Current Mock Data (frontend/src/mock/mockData.js)

### 1. Blog Posts (`mockData.blogPosts`)
**Purpose**: "Engineering Thoughts" blog section
**Current Mock**: 6 blog posts with complete metadata
**Backend Requirements**:
- MongoDB model for blog posts
- CRUD operations for blog management
- Search and filtering capabilities
- Category-based organization

### 2. Contact Submissions (`mockData.contactSubmissions`)
**Purpose**: Contact form submissions
**Current Mock**: Sample contact form submission
**Backend Requirements**:
- Store contact form submissions
- Email notification system (optional)
- Form validation and sanitization

### 3. Testimonials (`mockData.testimonials`)
**Purpose**: Client testimonials display
**Current Mock**: 3 testimonials with ratings
**Backend Requirements**:
- CRUD operations for testimonials
- Approval system for testimonials

### 4. Resume Data (`mockData.resumeData`)
**Purpose**: Structured resume information
**Current Mock**: Complete resume data
**Backend Requirements**:
- Single document storage for resume data
- Update capabilities for resume information

### 5. Statistics (`mockData.statistics`)
**Purpose**: Portfolio statistics display
**Current Mock**: Years of experience, projects, etc.
**Backend Requirements**:
- Dynamic statistics calculation
- Real-time updates

## API Endpoints to Implement

### Blog Posts API
```
GET /api/blog-posts                    # Get all blog posts (with pagination, search, filtering)
POST /api/blog-posts                   # Create new blog post
GET /api/blog-posts/:id                # Get specific blog post
PUT /api/blog-posts/:id                # Update blog post
DELETE /api/blog-posts/:id             # Delete blog post
GET /api/blog-posts/featured           # Get featured blog posts
GET /api/blog-posts/categories         # Get all categories
```

### Contact API
```
POST /api/contact                      # Submit contact form
GET /api/contact                       # Get all contact submissions (admin)
GET /api/contact/:id                   # Get specific contact submission
PUT /api/contact/:id                   # Update contact submission status
DELETE /api/contact/:id                # Delete contact submission
```

### Testimonials API
```
GET /api/testimonials                  # Get all approved testimonials
POST /api/testimonials                 # Create new testimonial
GET /api/testimonials/:id              # Get specific testimonial
PUT /api/testimonials/:id              # Update testimonial
DELETE /api/testimonials/:id           # Delete testimonial
```

### Resume API
```
GET /api/resume                        # Get complete resume data
PUT /api/resume                        # Update resume data
GET /api/resume/download               # Download resume as PDF
```

### Statistics API
```
GET /api/statistics                    # Get portfolio statistics
PUT /api/statistics                    # Update statistics
```

## MongoDB Models

### BlogPost Model
```javascript
{
  _id: ObjectId,
  title: String (required),
  excerpt: String (required),
  content: String (required),
  date: Date (default: Date.now),
  readTime: String (required),
  category: String (required),
  tags: [String],
  author: String (default: "Dewanshu Singh Sisaudiya"),
  featured: Boolean (default: false),
  published: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### ContactSubmission Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  subject: String (required),
  message: String (required),
  status: String (enum: ["new", "read", "responded"], default: "new"),
  timestamp: Date (default: Date.now),
  ipAddress: String,
  userAgent: String
}
```

### Testimonial Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  position: String (required),
  company: String (required),
  content: String (required),
  rating: Number (min: 1, max: 5),
  image: String,
  approved: Boolean (default: false),
  featured: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### Resume Model
```javascript
{
  _id: ObjectId,
  personalInfo: {
    name: String,
    title: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String
  },
  summary: String,
  education: [{
    degree: String,
    institution: String,
    year: String,
    location: String
  }],
  lastUpdated: Date
}
```

### Statistics Model
```javascript
{
  _id: ObjectId,
  yearsOfExperience: Number,
  teamsLed: Number,
  projectsCompleted: Number,
  companiesWorked: Number,
  technologiesUsed: Number,
  lastUpdated: Date
}
```

## Frontend Integration Changes

### 1. API Service Layer
Create `src/services/api.js` with:
- Axios configuration using `REACT_APP_BACKEND_URL`
- API methods for each endpoint
- Error handling and loading states
- Request/response interceptors

### 2. Component Updates Required

#### BlogSection.jsx
- Replace `mockData.blogPosts` with API calls
- Implement real search and filtering
- Add pagination support
- Handle loading and error states

#### ContactSection.jsx
- Replace mock form submission with real API call
- Add proper error handling and success feedback
- Implement form validation
- Add loading states during submission

#### HeroSection.jsx & Footer.jsx
- Connect resume download to real API endpoint
- Handle download functionality

#### Components using statistics
- Replace mock statistics with real API data
- Add real-time updates

### 3. State Management
- Implement proper state management for API data
- Add loading states for all API calls
- Handle error states gracefully
- Implement data caching where appropriate

## Environment Variables

### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017/portfolio_db
DB_NAME=portfolio_db
PORT=8001
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

## Error Handling Strategy

### Backend Error Responses
```javascript
{
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "User-friendly error message",
    details: "Technical details (development only)"
  }
}
```

### Frontend Error Handling
- Display user-friendly error messages
- Implement retry mechanisms
- Graceful degradation for failed API calls
- Toast notifications for feedback

## Security Considerations

### Backend Security
- Input validation and sanitization
- Rate limiting for contact form
- CORS configuration
- Request size limits
- Basic authentication for admin operations

### Frontend Security
- XSS protection in user inputs
- Proper form validation
- Secure handling of user data
- Environment variable protection

## Testing Strategy

### Backend Testing
- Unit tests for each API endpoint
- Integration tests for database operations
- Input validation testing
- Error handling testing

### Frontend Testing
- Component integration with API
- Form submission testing
- Error state handling
- Loading state validation

## Implementation Priority

1. **Phase 1**: Contact form API (highest priority)
2. **Phase 2**: Blog posts API with basic CRUD
3. **Phase 3**: Resume API and download functionality
4. **Phase 4**: Statistics API
5. **Phase 5**: Testimonials API (lowest priority)

## Success Criteria

- All mock data replaced with real API calls
- Contact form successfully submits to backend
- Blog posts are manageable via API
- Resume download functionality works
- Error handling provides good user experience
- Website maintains current visual design and functionality