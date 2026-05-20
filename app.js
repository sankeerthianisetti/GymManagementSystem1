import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import memberRoutes from "./routes/memberRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/members", memberRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("Gym Membership Management API is running...");
});

// Error handler
app.use(errorHandler);

export default app;
