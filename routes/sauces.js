const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const ctrlSauces = require('../controllers/sauces');

router.get('/', auth, ctrlSauces.getAllSauces);
router.get('/:id', auth, ctrlSauces.getSauce);
router.post('/', auth, multer, ctrlSauces.createSauce);

module.exports = router;
