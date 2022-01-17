const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user');

router.post('/api/auth/signup', ctrlUser.userSign);
router.post('/api/auth/login', ctrlUser.userLogin);

module.exports = router;