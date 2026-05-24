import Blog from "../models/Blog.js";
import { validationResult } from "express-validator";
import { BASE_URL } from '../config/information.js'

const showForm = (req, res) => {
	res.render("blog-form");
};
const deleteblog = async (req, res) => {
	const id = req.params.id;
	await Blog.findByIdAndDelete(req.params.id);
	res.redirect("/show-all");
}

const showall = async (req, res) => {
	const blogs = await Blog.find();
	res.render("bloglist", { blogs, BASE_URL });
};

const blogsubmitprocess = async (req, res) => {
	try {
		// express-validator errors
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				success: false,
				errors: errors.array()
			});
		}

		const blog = new Blog({
			title: req.body.blogTitle,
			slugUrl: req.body.slugUrl,
			shortDescription: req.body.shortDescription,
			blogContent: req.body.blogContent,
			metaTitle: req.body.metaTitle,
			metaDescription: req.body.metaDescription
		});

		const saveResponse = await blog.save();

		if (saveResponse._id == null) {
			res.redirect("/show-all");
		}

	} catch (error) {
		// Duplicate slug error
		if (error.code === 11000) {
			return res.status(409).json({
				success: false,
				field: "slugUrl",
				message: "Slug URL already exists"
			});
		}

		// Mongoose validation error
		if (error.name === "ValidationError") {
			return res.status(400).json({
				success: false,
				message: error.message
			});
		}

		// Generic server error
		return res.status(500).json({
			success: false,
			message: "Internal server error"
		});
	}
};

export default {
	showForm,
	blogsubmitprocess,
	showall,
	deleteblog
};