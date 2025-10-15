const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  task: {
    type: String,
  },

  progress: {
    type: String,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
