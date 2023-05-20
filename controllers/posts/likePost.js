const Post = require("../../models/Post");

const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const post = await Post.findById(id);
        const isLiked = post.likes.find((user) => user === userId)

        if (isLiked === userId) {
            post.likes = post.likes.filter((user) => user !== userId)
        } else {
            post.likes.push(userId)
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