import mongoose from "mongoose";
import dotenv from "dotenv"; // Import dotenv
import chalk from "chalk";

dotenv.config(); // Load environment variables from .env file

// Ensure the MongoDB connection URL is provided in the environment variables
if (!process.env.MONGO_DB_URL) {
  console.log("MONGO_DB_URL:", process.env.MONGO_DB_URL); // Debug output
  throw new Error(
    "❌ MongoDB URL is not defined in the environment variables. Please set 'MONGO_DB_URL' in your .env file."
  );
}

// Define an asynchronous function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to establish a connection to MongoDB
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(chalk.bgGreenBright("✅ Successfully connected to MongoDB!"));
  } catch (error) {
    // Log the error and exit the process on failure
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1); // Ensure the process exits to prevent running in an inconsistent state
  }
};

// Export the connectDB function
export default connectDB;
