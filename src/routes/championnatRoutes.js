const express = require('express');
const router = express.Router();
const championnatController = require('../controllers/championnatController');

router.get('/', championnatController.getAll);
router.get('/:id', championnatController.getById);
router.post('/', championnatController.create);
router.put('/:id', championnatController.update);
router.delete('/:id', championnatController.delete);

module.exports = router;

