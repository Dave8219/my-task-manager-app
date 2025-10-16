const Task = require("../models/Task.js");
const BadRequestError = require("../errors/bad-request.js");

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
};

const createTask = async (req, res) => {
  try {
    const tasks = await Task.create(req.body);
    res.status(201).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    return next(`No task with id: ${taskId}`, 404);
  }
  res.status(200).json(task);
};

const updateTask = async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(`No task with ID: ${taskId}`, 404);
  }
  res.status(200).json({ task });
};

const deleteTask = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });

    if (!task) {
      // return next(`No task with ID: ${task}`, 404);

      throw new BadRequestError("No existing ID found");
    }
    res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTask, getAllTasks, getTask, updateTask, deleteTask };
