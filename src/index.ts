import express, { Application, Response, Request, NextFunction } from "express";
import router from "./routes/index.js";
import { configDotenv } from "dotenv";
import cors from "cors";

const app: Application = express();
// * .env Config
configDotenv({
  path: ".env",
});
const PORT = process.env.PORT || 7000;

// * Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const { method, url } = req;
  const timestamp = new Date().toLocaleString();
  console.log(`[${timestamp}] ${method} ${url}`);
  next(); // Pass control to the next middleware or route handler
});

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// * API Path
app.use("/api/v1", router);

app.listen(PORT, () =>
  console.log(`Server is running. Visit http://localhost:${PORT}/api/v1/hello/`)
);
