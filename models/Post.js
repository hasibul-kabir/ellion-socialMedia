const mongoose = require("mongoose");

// const objectId = mongoose.Types.ObjectId
const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    description: String,
    picturePath: String,
    likes: {
        type: Map,
        of: Boolean
    },
    comments: {
        type: Array,
        default: []
    }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
module.exports = Post;