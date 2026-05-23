import { body } from "express-validator";

export const userValidation = [

    body("blogTitle")
        .trim()
        .notEmpty().withMessage("Blog title is required")
        .isLength({ min: 10 }).withMessage("Title must contain minimum 10 characters"),

    body("slugUrl")
        .notEmpty().withMessage("URL slug is required")
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).withMessage(
            "Slug can contain only lowercase letters, numbers and hyphens"
        ),

    body("shortDescription").trim().notEmpty()
        .withMessage("Short description is required")
        .isLength({ min: 5, max: 200 }).withMessage(
            "Short description must be between 5 and 200 characters"
        )



];