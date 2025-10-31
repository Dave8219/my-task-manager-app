const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const connectDB = require("./db/connect");
const tasks = require("./routes/tasks.js");
const passwordRouter = require("./routes/password.js");
const errorHandlerMiddleware = require("./middleware/error-handler.js");
require("dotenv").config();
const helmet = require("helmet");

app.use(
  express.json({
    strict: false,
  })
);

app.use(helmet());

const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://my-taskmanagerapp.netlify.app", // deployed frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// testing backend
/*
app.get("/", (req, res) => {
  res.send("My Task Manager App");
});
*/
const authenticateUser = require("./middleware/authentication.js");
app.use("/tasks", authenticateUser, tasks);

// routers
const authRouter = require("../backend/routes/auth.js");

// login routes
app.use("/user", authRouter);
app.use("/new-user", authRouter);
app.use("/auth", passwordRouter);

// app.use("/user/dashboard", authenticateUser, userRouter);

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
