const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const ctrlSauces = require('../controllers/sauces');

router.get('/', auth, ctrlSauces.getAllSauces);
router.get('/:id', auth, ctrlSauces.getSauce);
router.put('/:id', auth, multer, ctrlSauces.editSauce);
router.delete('/:id', auth, ctrlSauces.deleteSauce);
router.post('/:id/like', auth, ctrlSauces.likeSauce);
router.post('/', auth, multer, ctrlSauces.createSauce);

module.exports = router;
