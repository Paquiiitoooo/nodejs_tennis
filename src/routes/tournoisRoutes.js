const express = require('express');
const router = express.Router();
const tournoisController = require('../controllers/tournoisController');

router.get('/', tournoisController.getAll);
router.get('/:id', tournoisController.getById);
router.post('/', tournoisController.create);
router.put('/:id', tournoisController.update);
router.delete('/:id', tournoisController.delete);
router.post('/:id/participants', tournoisController.addParticipant);

module.exports = router;

