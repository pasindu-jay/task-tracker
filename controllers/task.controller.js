const Task = require('../models/Task');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const User = require('../models/User');

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

const getTotalScore = async (req, res) => {
  try {
    const tasks = await Task.aggregate([
      { $group: { _id: null, sumQuantity: { $sum: '$score' } } },
    ]);

    res.json(tasks[0].sumQuantity);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
};

const getTotalScoreUser = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  try {
    const tasks = await Task.aggregate([
      { $match: { user: ObjectId(req.user.id) } },
      {
        $group: {
          _id: ObjectId(req.user.id),
          sumQuantity: { $sum: '$score' },
        },
      },
    ]);

    res.json(tasks[0].sumQuantity);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error');
  }
};

const getSuperUserData = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  try {
    const test = await Task.aggregate([
      {
        $group: {
          _id: {
            user: '$user',
          },
          details: {
            $push: {
              name: '$name',
            },
          },
          sumQuantity: { $sum: '$score' },
        },
      },
      {
        $project: {
          _id: '$_id.user',
          sumQuantity: '$sumQuantity',
          details: 1,
        },
      },
    ]);

    const result = await User.populate(test, { path: '_id' });

    res.json(result);
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
      score: type === 'personal' ? -1 : 2,
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
  getTotalScore,
  getTotalScoreUser,
  getSuperUserData,
};
