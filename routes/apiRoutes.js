import express from "express";
import apiController from "../controllers/apiController.js";

const router = express.Router();

// Define Open API endpoints
router.get("/blogs", apiController.getAllBlogs);
router.get("/blogs/:slugUrl", apiController.getBlogBySlug);

export default router;
