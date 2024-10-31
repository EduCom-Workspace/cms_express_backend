import {Router} from 'express';
import { buyNewCourse, createNewCourse, createNewLesson, getAllCourses, getCourseLessons, markLessonComplete } from '../controllers/coursesController.js';
import { multerStorage } from '../model/multerClient.js';
const coursesRouter = Router();


coursesRouter.get('/courses/all-courses', getAllCourses)

coursesRouter.post('/courses/upload-new-lesson',  multerStorage.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'video', maxCount: 1 }]), createNewLesson)

coursesRouter.post('/courses/new-course', createNewCourse)

coursesRouter.post('/courses/buy-new-course', buyNewCourse)

coursesRouter.post('/courses/mark-complete-lesson', markLessonComplete)

coursesRouter.post('/courses/get-course-lessons', getCourseLessons)



export default coursesRouter;