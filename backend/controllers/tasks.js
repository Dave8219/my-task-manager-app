const Task = require("../models/Task.js");

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
};

module.exports = getAllTasks;
