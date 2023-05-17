const Post = require("../../models/Post");

const createPost = async (req, res) => {
    try {
        const { userId, description } = req.body;
        const picture = req.file || {};

        const newPost = new Post({
            user: userId,
            description,
            picturePath: picture.originalname,
            likes: {},
            comments: []
        })
        await newPost.save();

        res.status(200).json({
            message: "Post created Successfully"
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = createPost;