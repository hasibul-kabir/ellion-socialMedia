const express = require('express');
const verifyToken = require('../middlewares/authorization');
const getAllPosts = require('../controllers/posts/getAllPosts');
const postsRoute = express.Router();

postsRoute.get('/', verifyToken, getAllPosts);

module.exports = postsRoute;