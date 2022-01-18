const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user');

router.post('/signup', ctrlUser.userSign);
router.post('/login', ctrlUser.userLogin);

module.exports = router;
