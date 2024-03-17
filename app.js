require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./API/resources/user.router");
const rentRouter = require("./API/rent/router");
const bodyParser = require('body-parser');
const tasksRouter = require('./API/tasks/tasksRouter');

app.use(express.json());

app.use("/users/resources", userRouter);
app.use("/rent/",rentRouter);
app.use(bodyParser.json());
app.use('/tasks', tasksRouter);

const port = process.env.APP_PORT  || 4000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});



