const express = require('express');
const verifyToken = require('../middlewares/authorization');
const getAllPosts = require('../controllers/posts/getAllPosts');
const getUserPosts = require('../controllers/posts/getUserPosts');
const postsRoute = express.Router();

postsRoute.get('/', verifyToken, getAllPosts);
postsRoute.get('/:userId', verifyToken, getUserPosts);

module.exports = postsRoute;