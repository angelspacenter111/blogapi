import express from "express";
import multer from "multer";
import { userValidation } from "../validators/userValidator.js";
import blogController from "../controllers/blogController.js";

const router = express.Router();

const upload = multer({
    dest: "public/uploads/",
});

router.get("/", blogController.showForm);

router.get("/show-all", blogController.showall);
router.get("/delete/:id", blogController.deleteblog);

router.post(
    "/submit-form",
    upload.single("featuredImage"),
    userValidation,
    blogController.blogsubmitprocess
);

export default router;

