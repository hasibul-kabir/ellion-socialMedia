const Post = require("../../models/Post");

const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId)
        } else {
            post.likes.set(userId, true)
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        )

        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = likePost;