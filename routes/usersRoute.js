const express = require('express');
const { getAllUsers, getUser, getFriends, addRemoveFriend, editUser, getUserExceptFriends, searchUser } = require('../controllers/users');
const verifyToken = require('../middlewares/authorization');
const usersRoute = express.Router();

usersRoute.get('/', verifyToken, getAllUsers)
usersRoute.get('/:id', verifyToken, getUser)
usersRoute.get('/search/:key', verifyToken, searchUser)
usersRoute.patch('/:id/edit', verifyToken, editUser)
usersRoute.get('/:id/friends', verifyToken, getFriends)
usersRoute.get('/:id/notfriends', verifyToken, getUserExceptFriends)
usersRoute.patch('/:id/:friendId', verifyToken, addRemoveFriend)

module.exports = usersRoute;