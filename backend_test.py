#!/usr/bin/env python3
"""
Backend API Testing Suite for Dewanshu's Portfolio Website
Tests all backend endpoints with realistic data
"""

import requests
import json
import sys
from datetime import datetime
from typing import Dict, Any, List
import time

# Backend URL from frontend/.env
BASE_URL = "https://87c8a81b-687b-49fb-86f8-6bff799dbe2e.preview.emergentagent.com/api"

class PortfolioAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
        self.test_results = []
        
    def log_test(self, test_name: str, success: bool, details: str = ""):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"   Details: {details}")
        
        self.test_results.append({
            'test': test_name,
            'success': success,
            'details': details,
            'timestamp': datetime.now().isoformat()
        })
    
    def test_api_root(self):
        """Test API root endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/")
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "version" in data:
                    self.log_test("API Root Endpoint", True, f"Version: {data.get('version')}")
                    return True
                else:
                    self.log_test("API Root Endpoint", False, "Missing required fields in response")
                    return False
            else:
                self.log_test("API Root Endpoint", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("API Root Endpoint", False, f"Exception: {str(e)}")
            return False
    
    def test_contact_form_api(self):
        """Test Contact Form API endpoints"""
        print("\n=== Testing Contact Form API ===")
        
        # Test POST /api/contact with valid data
        contact_data = {
            "name": "Rajesh Kumar",
            "email": "rajesh.kumar@techcorp.com",
            "subject": "Collaboration Opportunity",
            "message": "Hi Dewanshu, I came across your portfolio and I'm impressed with your work in AI and software engineering. I'd like to discuss a potential collaboration opportunity for our upcoming project. Would you be available for a brief call next week?"
        }
        
        try:
            response = self.session.post(f"{self.base_url}/contact", json=contact_data)
            if response.status_code == 200:
                data = response.json()
                required_fields = ['id', 'name', 'email', 'subject', 'message', 'status', 'timestamp']
                if all(field in data for field in required_fields):
                    self.log_test("POST /api/contact (valid data)", True, f"Contact ID: {data.get('id')}")
                    contact_id = data.get('id')
                else:
                    self.log_test("POST /api/contact (valid data)", False, "Missing required fields in response")
                    return False
            else:
                self.log_test("POST /api/contact (valid data)", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("POST /api/contact (valid data)", False, f"Exception: {str(e)}")
            return False
        
        # Test POST /api/contact with invalid email
        invalid_contact_data = {
            "name": "Test User",
            "email": "invalid-email",
            "subject": "Test Subject",
            "message": "Test message"
        }
        
        try:
            response = self.session.post(f"{self.base_url}/contact", json=invalid_contact_data)
            if response.status_code == 422:  # Validation error expected
                self.log_test("POST /api/contact (invalid email)", True, "Validation error returned as expected")
            else:
                self.log_test("POST /api/contact (invalid email)", False, f"Expected 422, got {response.status_code}")
        except Exception as e:
            self.log_test("POST /api/contact (invalid email)", False, f"Exception: {str(e)}")
        
        # Test GET /api/contact
        try:
            response = self.session.get(f"{self.base_url}/contact")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("GET /api/contact", True, f"Retrieved {len(data)} contact submissions")
                else:
                    self.log_test("GET /api/contact", False, "Response is not a list")
            else:
                self.log_test("GET /api/contact", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/contact", False, f"Exception: {str(e)}")
        
        return True
    
    def test_blog_posts_api(self):
        """Test Blog Posts API endpoints"""
        print("\n=== Testing Blog Posts API ===")
        
        # First, create a test blog post
        blog_post_data = {
            "title": "Building Scalable AI Systems: Lessons from the Trenches",
            "excerpt": "After 14 years in software engineering and leading multiple AI initiatives, I've learned valuable lessons about building scalable AI systems that actually work in production.",
            "content": "In my journey as a Senior Manager in Software Engineering, I've had the privilege of leading teams through complex AI implementations across various domains. Today, I want to share some hard-earned insights about what it really takes to build AI systems that scale.\n\n## The Foundation: Architecture Matters\n\nOne of the biggest mistakes I see teams make is jumping straight into model development without considering the underlying architecture. A well-designed system architecture is the backbone of any successful AI implementation.\n\n## Team Dynamics in AI Projects\n\nLeading AI teams requires a unique blend of technical expertise and people management skills. Here's what I've learned about building high-performing AI teams...",
            "readTime": "8 min read",
            "category": "AI & Machine Learning",
            "tags": ["AI", "Software Architecture", "Team Leadership", "Scalability"],
            "featured": True,
            "published": True
        }
        
        try:
            response = self.session.post(f"{self.base_url}/blog-posts", json=blog_post_data)
            if response.status_code == 200:
                data = response.json()
                blog_post_id = data.get('id')
                self.log_test("POST /api/blog-posts", True, f"Created blog post ID: {blog_post_id}")
            else:
                self.log_test("POST /api/blog-posts", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("POST /api/blog-posts", False, f"Exception: {str(e)}")
            return False
        
        # Test GET /api/blog-posts
        try:
            response = self.session.get(f"{self.base_url}/blog-posts")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    self.log_test("GET /api/blog-posts", True, f"Retrieved {len(data)} blog posts")
                else:
                    self.log_test("GET /api/blog-posts", False, "No blog posts returned")
            else:
                self.log_test("GET /api/blog-posts", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/blog-posts", False, f"Exception: {str(e)}")
        
        # Test GET /api/blog-posts with search
        try:
            response = self.session.get(f"{self.base_url}/blog-posts?search=AI")
            if response.status_code == 200:
                data = response.json()
                self.log_test("GET /api/blog-posts (search)", True, f"Search returned {len(data)} results")
            else:
                self.log_test("GET /api/blog-posts (search)", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/blog-posts (search)", False, f"Exception: {str(e)}")
        
        # Test GET /api/blog-posts with category filter
        try:
            response = self.session.get(f"{self.base_url}/blog-posts?category=AI & Machine Learning")
            if response.status_code == 200:
                data = response.json()
                self.log_test("GET /api/blog-posts (category filter)", True, f"Category filter returned {len(data)} results")
            else:
                self.log_test("GET /api/blog-posts (category filter)", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/blog-posts (category filter)", False, f"Exception: {str(e)}")
        
        # Test GET /api/blog-posts/featured
        try:
            response = self.session.get(f"{self.base_url}/blog-posts/featured")
            if response.status_code == 200:
                data = response.json()
                self.log_test("GET /api/blog-posts/featured", True, f"Retrieved {len(data)} featured posts")
            else:
                self.log_test("GET /api/blog-posts/featured", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/blog-posts/featured", False, f"Exception: {str(e)}")
        
        # Test GET /api/blog-posts/categories
        try:
            response = self.session.get(f"{self.base_url}/blog-posts/categories")
            if response.status_code == 200:
                data = response.json()
                if "categories" in data:
                    self.log_test("GET /api/blog-posts/categories", True, f"Retrieved {len(data['categories'])} categories")
                else:
                    self.log_test("GET /api/blog-posts/categories", False, "Missing 'categories' field")
            else:
                self.log_test("GET /api/blog-posts/categories", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/blog-posts/categories", False, f"Exception: {str(e)}")
        
        return True
    
    def test_statistics_api(self):
        """Test Statistics API endpoints"""
        print("\n=== Testing Statistics API ===")
        
        # Test GET /api/statistics
        try:
            response = self.session.get(f"{self.base_url}/statistics")
            if response.status_code == 200:
                data = response.json()
                required_fields = ['yearsOfExperience', 'teamsLed', 'projectsCompleted', 'companiesWorked', 'technologiesUsed']
                if all(field in data for field in required_fields):
                    self.log_test("GET /api/statistics", True, f"Years of experience: {data.get('yearsOfExperience')}")
                else:
                    self.log_test("GET /api/statistics", False, "Missing required fields")
            else:
                self.log_test("GET /api/statistics", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/statistics", False, f"Exception: {str(e)}")
        
        # Test PUT /api/statistics
        updated_stats = {
            "yearsOfExperience": 15,
            "teamsLed": 6,
            "projectsCompleted": 30,
            "companiesWorked": 9,
            "technologiesUsed": 35
        }
        
        try:
            response = self.session.put(f"{self.base_url}/statistics", json=updated_stats)
            if response.status_code == 200:
                data = response.json()
                if data.get('yearsOfExperience') == 15:
                    self.log_test("PUT /api/statistics", True, "Statistics updated successfully")
                else:
                    self.log_test("PUT /api/statistics", False, "Statistics not updated correctly")
            else:
                self.log_test("PUT /api/statistics", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("PUT /api/statistics", False, f"Exception: {str(e)}")
        
        return True
    
    def test_resume_api(self):
        """Test Resume API endpoints"""
        print("\n=== Testing Resume API ===")
        
        # Test GET /api/resume
        try:
            response = self.session.get(f"{self.base_url}/resume")
            if response.status_code == 200:
                data = response.json()
                required_fields = ['personalInfo', 'summary', 'education']
                if all(field in data for field in required_fields):
                    self.log_test("GET /api/resume", True, f"Name: {data.get('personalInfo', {}).get('name')}")
                else:
                    self.log_test("GET /api/resume", False, "Missing required fields")
            else:
                self.log_test("GET /api/resume", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/resume", False, f"Exception: {str(e)}")
        
        # Test PUT /api/resume
        updated_resume = {
            "personalInfo": {
                "name": "Dewanshu Singh Sisaudiya",
                "title": "Senior Manager – Software Engineering",
                "email": "sisaudiya.dewan17@gmail.com",
                "phone": "+91 7668436606",
                "location": "Bangalore, India",
                "linkedin": "https://linkedin.com/in/dewanshu-sisaudiya",
                "github": "https://github.com/dewanshu-sisaudiya"
            },
            "summary": "Experienced engineering leader with 15+ years in software development, team management, and AI integration. Proven track record of leading high-performing teams and delivering scalable solutions.",
            "education": [
                {
                    "degree": "B.Tech. in Information Technology",
                    "institution": "UNSIET Jaunpur",
                    "year": "2007-2011",
                    "location": "India"
                }
            ]
        }
        
        try:
            response = self.session.put(f"{self.base_url}/resume", json=updated_resume)
            if response.status_code == 200:
                data = response.json()
                if "15+" in data.get('summary', ''):
                    self.log_test("PUT /api/resume", True, "Resume updated successfully")
                else:
                    self.log_test("PUT /api/resume", False, "Resume not updated correctly")
            else:
                self.log_test("PUT /api/resume", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("PUT /api/resume", False, f"Exception: {str(e)}")
        
        return True
    
    def test_testimonials_api(self):
        """Test Testimonials API endpoints"""
        print("\n=== Testing Testimonials API ===")
        
        # Test POST /api/testimonials
        testimonial_data = {
            "name": "Priya Sharma",
            "position": "Product Manager",
            "company": "TechInnovate Solutions",
            "content": "I had the pleasure of working with Dewanshu on a complex AI integration project. His technical expertise and leadership skills are exceptional. He not only delivered high-quality solutions but also mentored the entire team throughout the process. Dewanshu's ability to translate complex technical concepts into business value is remarkable.",
            "rating": 5,
            "image": "https://example.com/priya-sharma.jpg"
        }
        
        try:
            response = self.session.post(f"{self.base_url}/testimonials", json=testimonial_data)
            if response.status_code == 200:
                data = response.json()
                required_fields = ['id', 'name', 'position', 'company', 'content', 'rating', 'approved']
                if all(field in data for field in required_fields):
                    self.log_test("POST /api/testimonials", True, f"Testimonial ID: {data.get('id')}")
                else:
                    self.log_test("POST /api/testimonials", False, "Missing required fields")
            else:
                self.log_test("POST /api/testimonials", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("POST /api/testimonials", False, f"Exception: {str(e)}")
        
        # Test GET /api/testimonials
        try:
            response = self.session.get(f"{self.base_url}/testimonials")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("GET /api/testimonials", True, f"Retrieved {len(data)} testimonials")
                else:
                    self.log_test("GET /api/testimonials", False, "Response is not a list")
            else:
                self.log_test("GET /api/testimonials", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/testimonials", False, f"Exception: {str(e)}")
        
        # Test GET /api/testimonials with featured filter
        try:
            response = self.session.get(f"{self.base_url}/testimonials?featured=true")
            if response.status_code == 200:
                data = response.json()
                self.log_test("GET /api/testimonials (featured)", True, f"Retrieved {len(data)} featured testimonials")
            else:
                self.log_test("GET /api/testimonials (featured)", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_test("GET /api/testimonials (featured)", False, f"Exception: {str(e)}")
        
        return True
    
    def test_error_handling(self):
        """Test API error handling"""
        print("\n=== Testing API Error Handling ===")
        
        # Test invalid endpoint
        try:
            response = self.session.get(f"{self.base_url}/invalid-endpoint")
            if response.status_code == 404:
                self.log_test("Invalid endpoint (404)", True, "Correctly returned 404")
            else:
                self.log_test("Invalid endpoint (404)", False, f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_test("Invalid endpoint (404)", False, f"Exception: {str(e)}")
        
        # Test malformed JSON
        try:
            response = self.session.post(
                f"{self.base_url}/contact",
                data="invalid json",
                headers={'Content-Type': 'application/json'}
            )
            if response.status_code in [400, 422]:
                self.log_test("Malformed JSON handling", True, f"Correctly returned {response.status_code}")
            else:
                self.log_test("Malformed JSON handling", False, f"Expected 400/422, got {response.status_code}")
        except Exception as e:
            self.log_test("Malformed JSON handling", False, f"Exception: {str(e)}")
        
        # Test missing required fields
        try:
            response = self.session.post(f"{self.base_url}/contact", json={"name": "Test"})
            if response.status_code == 422:
                self.log_test("Missing required fields", True, "Correctly returned 422")
            else:
                self.log_test("Missing required fields", False, f"Expected 422, got {response.status_code}")
        except Exception as e:
            self.log_test("Missing required fields", False, f"Exception: {str(e)}")
        
        return True
    
    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Backend API Tests for Dewanshu's Portfolio Website")
        print(f"Testing against: {self.base_url}")
        print("=" * 60)
        
        # Test API connectivity first
        if not self.test_api_root():
            print("❌ API is not accessible. Stopping tests.")
            return False
        
        # Run all tests
        self.test_contact_form_api()
        self.test_blog_posts_api()
        self.test_statistics_api()
        self.test_resume_api()
        self.test_testimonials_api()
        self.test_error_handling()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result['success'])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  - {result['test']}: {result['details']}")
        
        return failed_tests == 0

if __name__ == "__main__":
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)