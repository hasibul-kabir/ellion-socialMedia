const Post = require("../../models/Post");

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        await Post.findByIdAndUpdate(
            id,
            { description: description },
            { new: true }
        )
        res.status(200).json({ message: "Post has updated." })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = updatePost;