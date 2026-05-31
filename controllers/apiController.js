import Blog from "../models/Blog.js";

/**
 * Fetch all blogs with pagination, optional search query, and sorting
 * GET /api/blogs
 */
const getAllBlogs = async (req, res) => {
    try {
        // 1. Pagination Parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // 2. Search Filter (Optional)
        let queryFilter = {};
        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, "i");
            queryFilter = {
                $or: [
                    { title: searchRegex },
                    { shortDescription: searchRegex },
                    { blogContent: searchRegex }
                ]
            };
        }

        // 3. Database queries (Total count & Paginated results)
        const totalCount = await Blog.countDocuments(queryFilter);
        const blogs = await Blog.find(queryFilter)
            .sort({ createdAt: -1 }) // Newest first
            .skip(skip)
            .limit(limit);

        const totalPages = Math.ceil(totalCount / limit);

        return res.status(200).json({
            success: true,
            count: blogs.length,
            totalCount,
            pagination: {
                currentPage: page,
                totalPages,
                limit
            },
            data: blogs
        });

    } catch (error) {
        console.error("Error in getAllBlogs API:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch blogs from database",
            error: error.message
        });
    }
};

/**
 * Fetch a single blog by its unique slug URL
 * GET /api/blogs/:slugUrl
 */
const getBlogBySlug = async (req, res) => {
    try {
        const { slugUrl } = req.params;

        if (!slugUrl) {
            return res.status(400).json({
                success: false,
                message: "Slug URL is required parameter"
            });
        }

        const blog = await Blog.findOne({ slugUrl: slugUrl.toLowerCase().trim() });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: `Blog post with slug '${slugUrl}' not found`
            });
        }

        return res.status(200).json({
            success: true,
            data: blog
        });

    } catch (error) {
        console.error(`Error in getBlogBySlug API for slug '${req.params.slugUrl}':`, error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch blog post",
            error: error.message
        });
    }
};

export default {
    getAllBlogs,
    getBlogBySlug
};
