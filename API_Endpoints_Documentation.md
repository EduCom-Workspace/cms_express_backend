
# API Endpoints Documentation

## User Authentication Routes

### 1. Sign Up (User)
- **Endpoint:** POST /api/auth/signup
- **Body:**
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "user_type": "string", // e.g., "student" or "teacher"
    "first_name": "string",
    "last_name": "string",
    "phone_number": "string"
  }
- **Response:** User details and token upon successful sign-up.

### 2. Log In (User)
- **Endpoint:** POST /api/auth/login
- **Body:**
  {
    "email": "string",
    "password": "string"
  }
- **Response:** User details and token upon successful login.

### 3. Sign Up (Admin)
- **Endpoint:** POST /api/auth/admin/signup
- **Body:**
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
- **Response:** Admin details and token upon successful sign-up.

### 4. Log In (Admin)
- **Endpoint:** POST /api/auth/admin/login
- **Body:**
  {
    "email": "string",
    "password": "string"
  }
- **Response:** Admin details and token upon successful login.

---

## Course Routes

### 1. Get All Courses
- **Endpoint:** GET /api/courses/all-courses
- **Response:** List of all courses, with each course containing:
  {
    "courseId": "string",
    "course_name": "string",
    "description": "string",
    "lessons": [ ... ]
  }

### 2. Upload New Lesson
- **Endpoint:** POST /api/courses/upload-new-lesson
- **Headers:** Content-Type: multipart/form-data
- **Body:** Form-data fields:
  - image1 (File) - The first image file for the lesson
  - image2 (File) - The second image file for the lesson
  - video (File) - The video file for the lesson
  - data (JSON) - Other lesson details:
    {
      "token": "string",
      "data": {
        "courseId": "string",
        "lesson_name": "string",
        "lesson_num": "number",
        "lesson_details": "string"
      }
    }
- **Response:** Lesson details with upload confirmation.

### 3. Create New Course
- **Endpoint:** POST /api/courses/new-course
- **Body:**
  {
    "token": "string",
    "data": {
      "course_name": "string",
      "description": "string"
    }
  }
- **Response:** Course details and confirmation of creation.

### 4. Buy New Course
- **Endpoint:** POST /api/courses/buy-new-course
- **Body:**
  {
    "token": "string",
    "data": {
      "courseId": "string"
    }
  }
- **Response:** Purchase confirmation and access details.

### 5. Mark Lesson as Complete
- **Endpoint:** POST /api/courses/mark-complete-lesson
- **Body:**
  {
    "token": "string",
    "data": {
      "courseId": "string",
      "lessonId": "string"
    }
  }
- **Response:** Lesson completion confirmation and progress update.

### 6. Get Course Lessons
- **Endpoint:** POST /api/courses/get-course-lessons
- **Body:**
  {
    "token": "string",
    "data": {
      "courseId": "string"
    }
  }
- **Response:** List of lessons for the specified course, with each lesson containing:
  {
    "lessonId": "string",
    "lesson_name": "string",
    "lesson_num": "number",
    "lesson_details": "string",
    "completed": "boolean"
  }

---

This document provides a comprehensive guide to the API endpoints for easy reference by frontend developers.
