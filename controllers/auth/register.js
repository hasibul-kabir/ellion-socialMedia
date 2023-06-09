const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, friends, location, occupation, viewedProfile, impressions } = req.body;
        const picture = req.file || {};


        //check- is email already used?
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(401).json({
                message: "This email is already exists!"
            })
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        //create user
        const newUser = await new User({
            firstName,
            lastName,
            email,
            password: hashedPass,
            picturePath: picture.originalname,
            friends,
            location,
            occupation,
            viewedProfile,
            impressions
        }).save();

        res.status(201).json(newUser)


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = register;