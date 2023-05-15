const User = require("../models/User")

exports.getMyProfile = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email })
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password -updatedAt -__v")
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const findFriends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )

        const friends = findFriends.map(({ _id, firstName, lastName, picturePath, occupation, location }) => {
            return { _id, firstName, lastName, picturePath, occupation, location }
        })

        res.status(200).json(friends)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//add or remove friends
exports.addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((fid) => fid !== friendId);
            friend.friends = friend.friends((fid) => fid !== id)
        } else {
            user.friends.push(friendId);
            friend.friends.push(id)
        }

        await user.save();
        await friend.save();

        const findFriends = await Promise.all(
            user.friends.map((fid) => User.findById(fid))
        )

        const friends = findFriends.map(({ _id, firstName, lastName, picturePath, occupation, location }) => {
            return { _id, firstName, lastName, picturePath, occupation, location }
        })

        res.status(200).json(friends)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}