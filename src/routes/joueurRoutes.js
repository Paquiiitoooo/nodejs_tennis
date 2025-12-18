const express = require('express');
const router = express.Router();
const joueurController = require('../controllers/joueurController');

router.get('/', (req, res, next) => {
  console.log('Route GET /api/joueurs appelée');
  next();
}, joueurController.getAll);

router.get('/:id', joueurController.getById);
router.post('/', joueurController.create);
router.put('/:id', joueurController.update);
router.delete('/:id', joueurController.delete);

module.exports = router;

