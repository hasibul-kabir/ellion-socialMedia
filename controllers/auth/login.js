const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await User.findOne({ email });
        //check email existence
        if (!user) {
            return res.status(400).json({
                message: "Wrong email or password!"
            })
        }
        //check password matched
        const matchPass = await bcrypt.compare(password, user.password);
        if (!matchPass) {
            return res.status(400).json({
                message: "Wrong email or password!"
            })
        }

        //create token
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_KEY);

        res.status(200).json({
            token, user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({
            errorMessage: error.message
        })
    }
}
module.exports = login;