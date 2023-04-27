const Post = require("../../models/Post");

const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ user: userId }).populate("user", "firstName lastName email");

        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}
module.exports = getUserPosts;