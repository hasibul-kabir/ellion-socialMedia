const Post = require("../../models/Post");

const getSpecificPost = async () => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        res.status(200).json(post)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = getSpecificPost;