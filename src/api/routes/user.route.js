const express = require('express');
const { getAllUsers, getUser, registerUser, updateUser, deleteUser, forgotPassword, loginUser } = require('../controllers/user.controller');

const router = express.Router();

//get all users
router.get('/', getAllUsers);

//get single user
router.get('/:userId', getUser);

//create user
router.post('/', registerUser);

//login user
router.post('/login', loginUser);

//update user
router.put('/:userId', updateUser);

//delete user
router.delete('/:userId', deleteUser);

//delete user
router.patch('/forgot-password', forgotPassword);

module.exports = router;