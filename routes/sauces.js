const express = require('express');
const router = express.Router();

const ctrlSauces = require('../controllers/sauces');

router.get('/api/sauces', ctrlSauces.getAllSauces);

module.exports = router;