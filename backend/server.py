from fastapi import FastAPI, APIRouter, HTTPException, Query
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
from bson import ObjectId
import re


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Helper function to convert ObjectId to string
def serialize_object_id(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    if isinstance(obj, dict):
        return {k: serialize_object_id(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [serialize_object_id(item) for item in obj]
    return obj

# Pydantic Models
class ContactSubmission(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=2000)
    status: str = Field(default="new")
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=2000)

class ContactSubmissionResponse(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    status: str
    timestamp: datetime

class BlogPost(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    excerpt: str = Field(..., min_length=1, max_length=500)
    content: str = Field(..., min_length=1)
    date: datetime = Field(default_factory=datetime.utcnow)
    readTime: str = Field(..., max_length=50)
    category: str = Field(..., max_length=100)
    tags: List[str] = Field(default_factory=list)
    author: str = Field(default="Dewanshu Singh Sisaudiya")
    featured: bool = Field(default=False)
    published: bool = Field(default=True)
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class BlogPostCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    excerpt: str = Field(..., min_length=1, max_length=500)
    content: str = Field(..., min_length=1)
    readTime: str = Field(..., max_length=50)
    category: str = Field(..., max_length=100)
    tags: List[str] = Field(default_factory=list)
    featured: bool = Field(default=False)
    published: bool = Field(default=True)

class BlogPostResponse(BaseModel):
    id: str
    title: str
    excerpt: str
    content: str
    date: datetime
    readTime: str
    category: str
    tags: List[str]
    author: str
    featured: bool
    published: bool
    createdAt: datetime
    updatedAt: datetime

class PersonalInfo(BaseModel):
    name: str = Field(default="Dewanshu Singh Sisaudiya")
    title: str = Field(default="Senior Manager – Software Engineering")
    email: str = Field(default="sisaudiya.dewan17@gmail.com")
    phone: str = Field(default="+91 7668436606")
    location: str = Field(default="Bangalore, India")
    linkedin: str = Field(default="https://linkedin.com/in/dewanshu-sisaudiya")
    github: str = Field(default="https://github.com/dewanshu-sisaudiya")

class Education(BaseModel):
    degree: str
    institution: str
    year: str
    location: str

class Resume(BaseModel):
    personalInfo: PersonalInfo
    summary: str = Field(default="Experienced engineering leader with 14+ years in software development, team management, and AI integration.")
    education: List[Education] = Field(default_factory=list)
    lastUpdated: datetime = Field(default_factory=datetime.utcnow)

class Statistics(BaseModel):
    yearsOfExperience: int = Field(default=14)
    teamsLed: int = Field(default=5)
    projectsCompleted: int = Field(default=25)
    companiesWorked: int = Field(default=8)
    technologiesUsed: int = Field(default=30)
    lastUpdated: datetime = Field(default_factory=datetime.utcnow)

class Testimonial(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    position: str = Field(..., min_length=1, max_length=100)
    company: str = Field(..., min_length=1, max_length=100)
    content: str = Field(..., min_length=1, max_length=1000)
    rating: int = Field(..., ge=1, le=5)
    image: str = Field(default="")
    approved: bool = Field(default=False)
    featured: bool = Field(default=False)
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class TestimonialCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    position: str = Field(..., min_length=1, max_length=100)
    company: str = Field(..., min_length=1, max_length=100)
    content: str = Field(..., min_length=1, max_length=1000)
    rating: int = Field(..., ge=1, le=5)
    image: str = Field(default="")

class TestimonialResponse(BaseModel):
    id: str
    name: str
    position: str
    company: str
    content: str
    rating: int
    image: str
    approved: bool
    featured: bool
    createdAt: datetime
    updatedAt: datetime

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running", "version": "1.0.0"}

# Contact Form Routes
@api_router.post("/contact", response_model=ContactSubmissionResponse)
async def submit_contact_form(contact_data: ContactSubmissionCreate):
    try:
        # Create contact submission
        submission = ContactSubmission(**contact_data.dict())
        
        # Insert into database
        result = await db.contact_submissions.insert_one(submission.dict())
        
        # Return response
        response_data = submission.dict()
        response_data["id"] = str(result.inserted_id)
        
        return ContactSubmissionResponse(**response_data)
    
    except Exception as e:
        logging.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@api_router.get("/contact", response_model=List[ContactSubmissionResponse])
async def get_contact_submissions():
    try:
        submissions = await db.contact_submissions.find().sort("timestamp", -1).to_list(1000)
        return [ContactSubmissionResponse(id=str(sub["_id"]), **{k: v for k, v in sub.items() if k != "_id"}) for sub in submissions]
    except Exception as e:
        logging.error(f"Error fetching contact submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch contact submissions")

# Blog Posts Routes
@api_router.get("/blog-posts", response_model=List[BlogPostResponse])
async def get_blog_posts(
    category: Optional[str] = None,
    search: Optional[str] = None,
    featured: Optional[bool] = None,
    published: Optional[bool] = True,
    limit: int = Query(default=10, le=100),
    skip: int = Query(default=0, ge=0)
):
    try:
        # Build query
        query = {}
        if category:
            query["category"] = category
        if search:
            query["$or"] = [
                {"title": {"$regex": search, "$options": "i"}},
                {"excerpt": {"$regex": search, "$options": "i"}},
                {"content": {"$regex": search, "$options": "i"}},
                {"tags": {"$regex": search, "$options": "i"}}
            ]
        if featured is not None:
            query["featured"] = featured
        if published is not None:
            query["published"] = published
        
        # Fetch posts
        posts = await db.blog_posts.find(query).sort("date", -1).skip(skip).limit(limit).to_list(limit)
        
        return [BlogPostResponse(id=str(post["_id"]), **{k: v for k, v in post.items() if k != "_id"}) for post in posts]
    
    except Exception as e:
        logging.error(f"Error fetching blog posts: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch blog posts")

@api_router.get("/blog-posts/featured", response_model=List[BlogPostResponse])
async def get_featured_blog_posts():
    try:
        posts = await db.blog_posts.find({"featured": True, "published": True}).sort("date", -1).to_list(10)
        return [BlogPostResponse(id=str(post["_id"]), **{k: v for k, v in post.items() if k != "_id"}) for post in posts]
    except Exception as e:
        logging.error(f"Error fetching featured blog posts: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch featured blog posts")

@api_router.get("/blog-posts/categories")
async def get_blog_categories():
    try:
        categories = await db.blog_posts.distinct("category", {"published": True})
        return {"categories": categories}
    except Exception as e:
        logging.error(f"Error fetching blog categories: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch blog categories")

@api_router.post("/blog-posts", response_model=BlogPostResponse)
async def create_blog_post(blog_data: BlogPostCreate):
    try:
        blog_post = BlogPost(**blog_data.dict())
        result = await db.blog_posts.insert_one(blog_post.dict())
        
        response_data = blog_post.dict()
        response_data["id"] = str(result.inserted_id)
        
        return BlogPostResponse(**response_data)
    
    except Exception as e:
        logging.error(f"Error creating blog post: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create blog post")

@api_router.get("/blog-posts/{post_id}", response_model=BlogPostResponse)
async def get_blog_post(post_id: str):
    try:
        if not ObjectId.is_valid(post_id):
            raise HTTPException(status_code=400, detail="Invalid post ID")
        
        post = await db.blog_posts.find_one({"_id": ObjectId(post_id)})
        if not post:
            raise HTTPException(status_code=404, detail="Blog post not found")
        
        return BlogPostResponse(id=str(post["_id"]), **{k: v for k, v in post.items() if k != "_id"})
    
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error fetching blog post: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch blog post")

# Resume Routes
@api_router.get("/resume", response_model=Resume)
async def get_resume():
    try:
        resume = await db.resume.find_one({})
        if not resume:
            # Create default resume if none exists
            default_resume = Resume(
                personalInfo=PersonalInfo(),
                education=[
                    Education(
                        degree="B.Tech. in Information Technology",
                        institution="UNSIET Jaunpur",
                        year="2007-2011",
                        location="India"
                    )
                ]
            )
            await db.resume.insert_one(default_resume.dict())
            return default_resume
        
        return Resume(**{k: v for k, v in resume.items() if k != "_id"})
    
    except Exception as e:
        logging.error(f"Error fetching resume: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch resume")

@api_router.put("/resume", response_model=Resume)
async def update_resume(resume_data: Resume):
    try:
        resume_data.lastUpdated = datetime.utcnow()
        
        await db.resume.replace_one({}, resume_data.dict(), upsert=True)
        return resume_data
    
    except Exception as e:
        logging.error(f"Error updating resume: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update resume")

# Statistics Routes
@api_router.get("/statistics", response_model=Statistics)
async def get_statistics():
    try:
        stats = await db.statistics.find_one({})
        if not stats:
            # Create default statistics if none exist
            default_stats = Statistics()
            await db.statistics.insert_one(default_stats.dict())
            return default_stats
        
        return Statistics(**{k: v for k, v in stats.items() if k != "_id"})
    
    except Exception as e:
        logging.error(f"Error fetching statistics: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch statistics")

@api_router.put("/statistics", response_model=Statistics)
async def update_statistics(stats_data: Statistics):
    try:
        stats_data.lastUpdated = datetime.utcnow()
        
        await db.statistics.replace_one({}, stats_data.dict(), upsert=True)
        return stats_data
    
    except Exception as e:
        logging.error(f"Error updating statistics: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update statistics")

# Testimonials Routes
@api_router.get("/testimonials", response_model=List[TestimonialResponse])
async def get_testimonials(approved: bool = True, featured: Optional[bool] = None):
    try:
        query = {"approved": approved}
        if featured is not None:
            query["featured"] = featured
        
        testimonials = await db.testimonials.find(query).sort("createdAt", -1).to_list(1000)
        return [TestimonialResponse(id=str(test["_id"]), **{k: v for k, v in test.items() if k != "_id"}) for test in testimonials]
    
    except Exception as e:
        logging.error(f"Error fetching testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch testimonials")

@api_router.post("/testimonials", response_model=TestimonialResponse)
async def create_testimonial(testimonial_data: TestimonialCreate):
    try:
        testimonial = Testimonial(**testimonial_data.dict())
        result = await db.testimonials.insert_one(testimonial.dict())
        
        response_data = testimonial.dict()
        response_data["id"] = str(result.inserted_id)
        
        return TestimonialResponse(**response_data)
    
    except Exception as e:
        logging.error(f"Error creating testimonial: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create testimonial")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
