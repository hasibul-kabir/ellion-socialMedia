const User = require("../models/User")


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
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.searchUser = async (req, res) => {
    try {
        const { key } = req.params;
        const query = new RegExp(key, 'i');

        if (query === '') {
            return res.status(404).json({ message: 'No matched result!' })
        }
        const searchResult = await User.find({ lastName: query }, '_id firstName lastName picturePath');

        res.status(200).json(searchResult)

    } catch (error) {
        res.status(500).json({
            message: "Something wrong!"
        })
    }
}

exports.editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, occupation, location } = req.body;

        await User.findByIdAndUpdate(
            id,
            {
                firstName,
                lastName,
                occupation,
                location
            },
            { new: true }
        )

        res.status(200).json({
            message: "Profile updated."
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getUserExceptFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const allUsers = await User.find();
        const user = await User.findById(id);

        const notFriends = allUsers.filter(({ _id }) => !user.friends.includes(_id));
        const userExceptFriends = notFriends.map(({ _id, firstName, lastName, picturePath, occupation, location }) => {
            return { _id, firstName, lastName, picturePath, occupation, location }
        })

        res.status(200).json(userExceptFriends)

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
            friend.friends = friend.friends.filter((fid) => fid !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id)
        }

        await user.save();
        await friend.save();

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}