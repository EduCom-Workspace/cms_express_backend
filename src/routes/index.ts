import { Router } from "express";
import helloRouter from "./hello.route.js";
import userAuthRoute from "./auth/user.auth.route.js";

const router = Router();
// Register all your router here.
router.use("/hello", helloRouter);
router.use('/auth/user', userAuthRoute)

export default router;