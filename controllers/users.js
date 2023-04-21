const User = require("../models/User")

exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
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
            errorMessage: error.message
        })
    }
}