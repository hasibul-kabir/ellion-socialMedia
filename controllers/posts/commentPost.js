const Post = require("../../models/Post");

const commentPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, comment } = req.body;

        const post = await Post.findById(id);

        post.comments.push({ [userId]: comment })

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { comments: post.comments },
            { new: true }
        )

        res.status(200).json(updatedPost)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = commentPost;