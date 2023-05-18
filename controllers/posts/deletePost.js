const Post = require("../../models/Post");
const fs = require('fs')

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const postData = await Post.findById(id);
        await Post.findByIdAndDelete(id);
        fs.unlinkSync(`public/assets/${postData?.picturePath}`)
        res.status(200).json({ message: "Post has deleted." })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = deletePost;