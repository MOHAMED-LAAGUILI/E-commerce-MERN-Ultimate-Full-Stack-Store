// Importing dependencies
import express from "express"; // Fast, minimalist web framework for Node.js
import cors from "cors"; // Middleware to enable Cross-Origin Resource Sharing
import dotenv from "dotenv"; // Module to load environment variables from a `.env` file
import cookieParser from "cookie-parser"; // Middleware to parse cookies in incoming requests
import morgan from "morgan"; // HTTP request logger middleware
import helmet from "helmet"; // Middleware to secure Express apps by setting HTTP headers
import chalk from "chalk"; // Library for colored terminal output
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/user.route.js";

// Load environment variables from the .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware: Secure the app by defining allowed endpoints for CORS
app.use(
  cors({
    credentials: true, // Allow cookies to be included with requests
    origin: process.env.FRONTEND_URL, // Restrict access to the frontend URL specified in .env
  })
);

// Middleware: Parse incoming JSON payloads
app.use(express.json());

// Middleware: Parse cookies from requests
app.use(cookieParser());

// Middleware: Log HTTP requests in a developer-friendly format
app.use(morgan("dev"));

// Middleware: Enhance app security with various HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: false, // Allow cross-origin resource loading
  })
);

// Define constants for server configuration
const PORT = process.env.PORT || 8080; // Use port 3000 as an alternative
const END_POINT = "http://localhost"; // Base endpoint for server


app.get("/",(req,res) => {
  res.json({message:"server is running"})
})

connectDB().then(() => {
    app.listen(PORT, (err) => {
        if (err) {
          console.error(chalk.red(`❌ Error starting server: ${err.message}`));
          process.exit(1);
        }
        console.log(chalk.greenBright(`🚀 Server is running at ${chalk.blueBright(`${END_POINT}:${PORT}`)}`));
      });
})


app.use("/api/user",userRouter)
