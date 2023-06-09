const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const url = require('url');
//internal imports
const register = require('./controllers/auth/register');
const authRoute = require('./routes/authentication');
const verifyToken = require('./middlewares/authorization');
const usersRoute = require('./routes/usersRoute');
const createPost = require('./controllers/posts/createPost');
const postsRoute = require('./routes/postsRoute');
const { updateProfilePic } = require('./controllers/users');


dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

// FILE STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage });

//ROUTES
app.post('/auth/register', upload.single("picture"), register);
app.post('/posts', upload.single("picture"), verifyToken, createPost);
app.patch('/users/editphoto', upload.single("picture"), verifyToken, updateProfilePic);
app.use('/auth', authRoute);
app.use('/users', usersRoute);
app.use('/posts', postsRoute);

app.get('/', (req, res) => {
    res.send('Ellion Social Media');
})

// DATABASE CONNOCTION
const PORT = process.env.PORT || 9000
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected');
    app.listen(PORT, () => console.log(`Server running on port - ${PORT}`))
}).catch((err) => console.log(`${err} Can't connect`))

module.exports = app;