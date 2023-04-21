const express = require('express');
const { getAllUsers, getUser, getFriends } = require('../controllers/users');
const verifyToken = require('../middlewares/authorization');
const usersRoute = express.Router();

usersRoute.get('/', verifyToken, getAllUsers)
usersRoute.get('/:id', verifyToken, getUser)
usersRoute.get('/:id/friends', verifyToken, getFriends)

module.exports = usersRoute;