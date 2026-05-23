import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import connectDB from "./config/db.js";

import blogRoutes from "./routes/blogRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
// __dirname setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", blogRoutes);

// Server
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});