const express = require('express');
const tasksController = require('./tasksController');
const router = express.Router();

router.post('/', tasksController.createTask);
router.get('/:id', tasksController.getTask);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;
