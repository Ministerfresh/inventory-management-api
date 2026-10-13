const express = require('express');
const router = express.Router();
const { createUser, login } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware')


// ! No authentication here as requested
router.post('/createUser', createUser);
router.post('/login', login);

module.exports = router;