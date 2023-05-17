const Post = require("../../models/Post");

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete(id)
        res.status(200).json({ message: "Post has been deleted." })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = deletePost;