require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./API/resources/user.router");

app.use(express.json());

app.use("/users/resources", userRouter);

const port = process.env.APP_PORT  || 4000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});



