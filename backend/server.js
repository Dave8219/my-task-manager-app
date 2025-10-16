const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./db/connect");
const tasks = require("./routes/tasks.js");
const errorHandlerMiddleware = require("./middleware/error-handler.js");
require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("My Task Manager App");
});

app.use("/tasks", tasks);

app.use(errorHandlerMiddleware);

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
