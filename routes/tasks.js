const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');
const {
  getTasks,
  addTask,
  deleteTask,
} = require('../controllers/task.controller');

router.get('/', auth, getTasks);

router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  addTask
);

router.delete('/:id', auth, deleteTask);
module.exports = router;
