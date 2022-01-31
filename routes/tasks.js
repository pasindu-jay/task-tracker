const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');
const {
  getTasks,
  addTask,
  deleteTask,
  getTotalScore,
  getTotalScoreUser,
} = require('../controllers/task.controller');

router.get('/', auth, getTasks);

router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  addTask
);

router.get('/get_total_score', getTotalScore);

router.get('/get_total_score_user', auth, getTotalScoreUser);

router.delete('/:id', auth, deleteTask);
module.exports = router;
