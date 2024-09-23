import { Router } from "express";
import { helloView } from "../views/hello.view.js";

const helloRouter = Router();
// Define your routes end-points here.
helloRouter.get("/", helloView);

export default helloRouter;