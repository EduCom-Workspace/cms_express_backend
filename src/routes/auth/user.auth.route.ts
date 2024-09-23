import { Router } from "express";
import { deleteAllUsers, getAllStudents, userAuthLogin, userAuthSignUp } from "../../views/auth/user.auth.view.js";

const userAuthRoute = Router();

userAuthRoute.post('/signup', userAuthSignUp)
userAuthRoute.post('/login', userAuthLogin)
userAuthRoute.get('/get-all', getAllStudents)
userAuthRoute.delete('/delete-all-users', deleteAllUsers)


export default userAuthRoute;