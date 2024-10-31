import prisma from "../model/prismaClient.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// Load environment variables from.env file
dotenv.config();

export const getAllCourses = async (req, res) => {
    try {
        const courses = await prisma.course.findMany();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createNewLesson = async (req, res) => {
    try {
        const { token, data } = req.body;
        const { courseId, lesson_name, lesson_num, lesson_details } = data;
        // Verify the JWT token
        let verifiToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifiToken) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Check if required fields are provided
        if (!courseId || !lesson_name || !lesson_num || !lesson_details) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if course exists
        const isValidCourse = await prisma.course.findUnique({
            where: { course_id: courseId },
        });
        if (!isValidCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Get uploaded file paths
        const image1 = req.files?.image1 ? req.files.image1[0].path : null;
        const image2 = req.files?.image2 ? req.files.image2[0].path : null;
        const video_url = req.files?.video ? req.files.video[0].path : null;

        let post_date = new Date().toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
        });

        // Create new lesson
        const newLesson = await prisma.lesson.create({
            data: {
                course_id: courseId,
                lesson_name,
                lesson_num,
                lesson_details,
                image1,
                image2,
                video_url: video_url, // Use video URL from the form or uploaded file
                post_date,
            },
        });

        res
            .status(201)
            .json({ message: "New lesson created successfully", lesson: newLesson });
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Facing a problem while creating new lesson.",
                error: error.message,
            });
    }
};

export const createNewCourse = async (req, res) => {
    try {
        const { token, data } = req.body;
        const { course_name } = data;
        // Verify the JWT token
        let verifiToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifiToken) {
            return res.status(401).json({ message: "Invalid token" });
        }
        // Check if required fields are provided
        if (!course_name) {
            return res.status(400).json({ message: "Course name is required" });
        }
        // Create new course
        const newCourse = await prisma.course.create({
            data: {
                course_name,
            },
        });
        res
            .status(201)
            .json({ message: "New course created successfully", course: newCourse });
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Facing a problem while creating new course.",
                error: error.message,
            });
    }
};

export const buyNewCourse = async (req, res) => {
    try {
        const { token, data } = req.body;
        const { courseId } = data;
        // Verify the JWT token
        let verifiToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifiToken) {
            return res.status(401).json({ message: "Invalid token" });
        }
        // Check if required fields are provided
        if (!courseId || !amount) {
            return res
                .status(400)
                .json({ message: "Course ID and amount are required" });
        }
        // Check if course exists
        const isValidCourse = await prisma.course.findUnique({
            where: { course_id: courseId },
        });
        if (!isValidCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        const user_id = verifiToken.userId || null;

        if (!user_id) {
            return res.status(404).json({ message: "User not found" });
        }

        let enroll_date = new Date().toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
        });

        // Create new purchase
        const newPurchase = await prisma.enrollment.create({
            data: {
                enroll_date,
                student_id: user_id,
                course_id: courseId,
            },
        });

        res
            .status(201)
            .json({
                message: "Course purchased successfully",
                purchase: newPurchase,
            });
    } catch (err) {
        res
            .status(500)
            .json({
                message: "Facing a problem while purchasing a course.",
                error: err.message,
            });
    }
};

export const markLessonComplete = async (req, res) => {
    try {
        const { token, data } = req.body;
        const { courseId, lessonId } = data;
        // Verify the JWT token
        let verifiToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifiToken) {
            return res.status(401).json({ message: "Invalid token" });
        }
        // Check if required fields are provided
        if (!courseId || !lessonId) {
            return res
                .status(400)
                .json({ message: "Course ID and lesson number are required" });
        }
        // Check if course and lesson exist
        const isValidCourse = await prisma.course.findUnique({
            where: { course_id: courseId },
        });
        const isValidLesson = await prisma.lesson.findUnique({
            where: { lesson_id: lessonId },
        });
        if (!isValidCourse || !isValidLesson) {
            return res.status(404).json({ message: "Course or Lesson not found" });
        }
        // Mark the lesson as complete
        const markComplete = await prisma.studentLesson.create({
            data: {
                student_id: verifiToken.userId,
                lesson_id: lessonId,
                course_id: courseId,
                complete_date: new Date().toLocaleString("en-US", {
                    timeZone: "Asia/Kolkata",
                }),
            },
        });
        res
            .status(201)
            .json({
                message: "Lesson marked as complete",
                markComplete: markComplete,
            });
    } catch (err) {
        return res
            .status(401)
            .json({
                message: "Facing problem while mark lesson.",
                error: err.message,
            });
    }
};
 
export const getCourseLessons = async (req, res) => {
    try {
        const { token, data } = req.body;
        const { courseId } = data;
        const isValidToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!isValidToken) {
            return res.status(401).json({ message: "Invalid token" });
        }
        // Check if required fields are provided
        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }
        // Get course lessons
        const courseLessons = await prisma.lesson.findMany({
            where: { course_id: courseId },
        });
        res.status(200).json({ message: "Course lessons", courseLessons });
    } catch (err) {
        return res.status(500).json({
            message: "Facing problem while getting course lessons.",
            error: err.message,
        });
    }
}
