const express = require('express');
const verifyToken = require('../middlewares/authorization');
const getAllPosts = require('../controllers/posts/getAllPosts');
const getUserPosts = require('../controllers/posts/getUserPosts');
const likePost = require('../controllers/posts/likePost');
const deletePost = require('../controllers/posts/deletePost');
const updatePost = require('../controllers/posts/updatePost');
const getSpecificPost = require('../controllers/posts/getSpecificPost');
const commentPost = require('../controllers/posts/commentPost');
const postsRoute = express.Router();

postsRoute.get('/', verifyToken, getAllPosts);
postsRoute.get('/:userId/posts', verifyToken, getUserPosts);
postsRoute.get('/:id', verifyToken, getSpecificPost);
postsRoute.delete('/:id/delete', verifyToken, deletePost);
postsRoute.patch('/:id/update', verifyToken, updatePost);
postsRoute.patch('/:id/like', verifyToken, likePost);
postsRoute.patch('/:id/comment', verifyToken, commentPost);

module.exports = postsRoute;