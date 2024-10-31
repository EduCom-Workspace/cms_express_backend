
# API Endpoints Documentation

## User Authentication Routes

### 1. Sign Up (User)
- **Endpoint:** <span style="background-color:blue; padding:3px; border-radius:5px">POST</span> `/api/auth/signup`
- **Body:**
   ```json
   {
    "username": "string",
    "email": "string",
    "password": "string",
    "user_type": "string", 
    "first_name": "string",
    "last_name": "string",
    "phone_number": "string"
  }
  // e.g. user_type: "student" or "teacher"
  ```
- **Response:** User details and token upon successful sign-up.

### 2. Log In (User)
- **Endpoint:** <span style="background-color:blue; padding:3px; border-radius:5px">POST</span> `/api/auth/login`
- **Body:**
 ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:** User details and token upon successful login.

### 3. Sign Up (Admin)
- **Endpoint:** <span style="background-color:blue; padding:3px; border-radius:5px">POST</span> `/api/auth/admin/signup`
- **Body:**
 ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:** Admin details and token upon successful sign-up.

### 4. Log In (Admin)
- **Endpoint:** <span style="background-color:blue; padding:3px; border-radius:5px">POST</span> `/api/auth/admin/login`
- **Body:**
 ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:** Admin details and token upon successful login.

---

## Course Routes

### 1. Get All Courses
- **Endpoint:** <span style="background-color:green; padding:3px; border-radius:5px">GET</span> `/api/courses/all-courses`
- **Response:** List of all courses, with each course containing:
 ```json
  {
    "courseId": "string",
    "course_name": "string",
    "description": "string",
    "lessons": [ ... ]
  }
  ```
### 2. Upload New Lesson
- **Endpoint:** <span style="background-color:blue; padding:3px; border-radius:5px">POST</span> `/api/courses/upload-new-lesson`
- **Headers:** Content-Type: multipart/form-data
- **Body:** Form-data fields:
  - image1 (File) - The first image file for the lesson
  - image2 (File) - The second image file for the lesson
  - video (File) - The video file for the lesson
  - data (JSON) - Other lesson details:
   ```json
    {
      "token": "string",
      "data": {
        "courseId": "string",
        "lesson_name": "string",
        "lesson_num": "number",
        "lesson_details": "string"
      }
    }
    ```
- **Response:** Lesson details with upload confirmation.

### 3. Create New Course
- **Endpoint:** <span style="background-color:blue; padding:3px; border-radius:5px">POST</span> `/api/courses/new-course`
- **Body:**
 ```json
  {
    "token": "string",
    "data": {
      "course_name": "string",
      "description": "string"
    }
  }
  ```
- **Response:** Course details and confirmation of creation.

### 4. Buy New Course
- **Endpoint:** <span style="background-color:blue; padding:3px; border-radius:5px">POST</span> `/api/courses/buy-new-course`
- **Body:**
 ```json
  {
    "token": "string",
    "data": {
      "courseId": "string"
    }
  }
  ```
- **Response:** Purchase confirmation and access details.

### 5. Mark Lesson as Complete
- **Endpoint:** <span style="background-color:blue; padding:3px; border-radius:5px">POST</span> `/api/courses/mark-complete-lesson`
- **Body:**
 ```json
  {
    "token": "string",
    "data": {
      "courseId": "string",
      "lessonId": "string"
    }
  }
  ```
- **Response:** Lesson completion confirmation and progress update.

### 6. Get Course Lessons
- **Endpoint:** <span style="background-color:blue; padding:3px; border-radius:5px">POST</span> `/api/courses/get-course-lessons`
- **Body:**
 ```json
  {
    "token": "string",
    "data": {
      "courseId": "string"
    }
  }
  ```
- **Response:** List of lessons for the specified course, with each lesson containing:
 ```json
  {
    "lessonId": "string",
    "lesson_name": "string",
    "lesson_num": "number",
    "lesson_details": "string",
    "completed": "boolean"
  }
```
---

This document provides a comprehensive guide to the API endpoints for easy reference by frontend developers.
