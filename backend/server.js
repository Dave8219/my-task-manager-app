const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./db/connect");
const tasks = require("./routes/tasks.js");

require("dotenv").config();

app.get("/", (req, res) => {
  res.send("My Task Manager App");
});

app.use("/tasks", tasks);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
