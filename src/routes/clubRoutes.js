const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');

router.get('/', clubController.getAll);
router.get('/:id', clubController.getById);
router.post('/', clubController.create);

module.exports = router;

