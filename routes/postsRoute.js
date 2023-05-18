const express = require('express');
const verifyToken = require('../middlewares/authorization');
const getAllPosts = require('../controllers/posts/getAllPosts');
const getUserPosts = require('../controllers/posts/getUserPosts');
const likePost = require('../controllers/posts/likePost');
const deletePost = require('../controllers/posts/deletePost');
const updatePost = require('../controllers/posts/updatePost');
const postsRoute = express.Router();

postsRoute.get('/', verifyToken, getAllPosts);
postsRoute.get('/:userId/posts', verifyToken, getUserPosts);
postsRoute.delete('/:id/delete', verifyToken, deletePost);
postsRoute.patch('/:id/update', verifyToken, updatePost);
postsRoute.patch('/:id/like', verifyToken, likePost);

module.exports = postsRoute;