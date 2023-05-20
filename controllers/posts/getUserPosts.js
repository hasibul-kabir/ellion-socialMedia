const Post = require("../../models/Post");

const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ user: userId }).populate("user", "firstName lastName email picturePath").sort('-createdAt');

        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ message: "" })
    }
}
module.exports = getUserPosts;