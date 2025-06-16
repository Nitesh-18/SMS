import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import { startCodeforcesSync } from "./cron/syncCodeforces.js";

config();

const app = express();
connectDB();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(json());

// TODO: student routes to be added later
// Use the student routes
app.use("/api/students", studentRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Student Progress Management API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
startCodeforcesSync();