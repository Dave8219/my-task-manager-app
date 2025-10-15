require("dotenv").config();

const connectDB = require("./db/connect.js");
const Task = require("./models/Task.js");

const jsonTasks = require("./people.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Task.deleteMany();
    await Task.create(jsonTasks);
    console.log("Success!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
