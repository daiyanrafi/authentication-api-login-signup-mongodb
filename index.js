const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const todoHandler = require("./routeHandler/todoHandler");
const userHandler = require("./routeHandler/userHandler");

//express initialization
const app = express();
//require('dotenv').config()
dotenv.config();
app.use(express.json());

//database connection with mongoose
mongoose.set("strictQuery", true);
// nstead of http://localhost you have to wite http://0.0.0.0 to
// connect the database (connection string)
mongoose
  .connect("mongodb://0.0.0.0/todos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(err));

//application routes
app.use("/todo", todoHandler);
app.use("/user", userHandler);

//default error handler
const errorHandler = (err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.use(errorHandler);

app.listen(3000, () => {
  console.log("app listening at port 3000");
});
