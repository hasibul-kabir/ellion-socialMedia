const Post = require("../../models/Post")

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "firstName lastName email");
        res.status(200).json(posts)

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}
module.exports = getAllPosts;