import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({

	title: {
		type: String,
		required: true,
		trim: true
	},

	slugUrl: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true
	},

	shortDescription: {
		type: String,
		required: true,
		trim: true
	},

	blogContent: {
		type: String,
		required: true
	},

	metaTitle: {
		type: String,
		required: true,
		trim: true
	},

	metaDescription: {
		type: String,
		required: true,
		trim: true
	}

}, {
	timestamps: true
});

const Blog = mongoose.model(
	"Blog",
	blogSchema,
	"collection_angelspa"
);

export default Blog;