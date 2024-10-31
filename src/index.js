import Express from "express";
import dotenv from "dotenv";
import cors from "cors";
import UserAuthRouter from "./routes/authRoutes.js";
import coursesRouter from "./routes/coursesRoute.js";

// Load environment variables from .env file
dotenv.config();

const app = Express();
const PORT = process.env.PORT || 8090;

// all the middleware here
app.use(cors());
app.use(Express.json());

// add all the routes here
app.use('/api/auth', UserAuthRouter);
app.use('/api', coursesRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/`);
});
