const Task = require('../models/Task');
const { validationResult } = require('express-validator');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(tasks);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
};

const addTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { name, type } = req.body;

  try {
    const newTask = new Task({
      user: req.user.id,
      name,
      type,
    });

    const task = await newTask.save();

    res.json(task);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await Task.findByIdAndRemove(req.params.id);

    res.json({
      msg: 'Task Removed',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getTasks,
  addTask,
  deleteTask,
};
