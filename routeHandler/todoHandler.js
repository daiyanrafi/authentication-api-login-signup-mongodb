const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
//model for using object mapping. object data model (ODM)
const Todo = new mongoose.model("Todo", todoSchema);

//get active todos using async-await (SAME THING 2 WAYS - ASYNC-AWAIT)
router.get("/active", async (req, res) => {
  const todo = new Todo();
  const data = await todo.findActive();
  res.status(200).json({
    data: data,
  });
});

//get active todos using callback (SAME THING 2 WAYS - CALLBACK)
router.get("/active-callback", (req, res) => {
  const todo = new Todo();
  todo.findActiveCallback((err, data) => {
    res.status(200).json({
      data: data,
    });
  });
});

//get js object [static - method]
router.get("/js", async (req, res) => {
  const data = await Todo.findByJS();
  res.status(200).json({
    data,
  });
});

//get todo language query helpers
router.get("/language", async (req, res) => {
  const data = await Todo.find().byLanguage("india");
  res.status(200).json({
    data,
  });
});

//get all the todos
router.get("/", (req, res) => {
  //   await Todo.find({ status: "active" }, (err, data) => {
  //     if (err) {
  //       res.status(500).json({
  //         error: "therea a server error bro!",
  //       });
  //     } else {
  //       res.status(200).json({
  //         result: data,
  //         message: "todo Inserted wonderfully",
  //       });
  //     }
  //   }).clone();
  Todo.find({ status: "active" })
    .select({
      _id: 0,
      _v: 0,
      date: 0,
    })
    //limit means 2 list will show
    .limit(2)
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "therea a server error bro!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "todo Inserted wonderfully",
        });
      }
    });
});

//get a todo by id
router.get("/:id", async (req, res) => {
  try {
    const data = await Todo.find({ _id: req.params.id });
    res.status(200).json({
      result: data,
      message: "todo Inserted wonderfully",
    });
  } catch {
    res.status(500).json({
      error: "therea a server error bro!",
    });
  }
  // await Todo.find({ _id: req.params.id }, (err, data) => {
  //   if (err) {
  //     res.status(500).json({
  //       error: "therea a server error bro!",
  //     });
  //   } else {
  //     res.status(200).json({
  //       result: data,
  //       message: "todo Inserted wonderfully",
  //     });
  //   }
  // }).clone();
});

//post todo
router.post("/", async (req, res) => {
  //did this to get the result for feed back.. api hit kotle terminal eh show kore
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        Error: "there was a server problm",
      });
    } else {
      res.status(200).json({
        message: "insert done",
      });
    }
  });
});

//post multiple todo
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        Error: "there was a server problm",
      });
    } else {
      res.status(200).json({
        message: "List are inserted successfully",
      });
    }
  });
});

//put todo
router.put("/:id", async (req, res) => {
  //updateMany
  //findByIdAndMany
  //updateOne
  const result = await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      //for update $set property and its an object
      $set: {
        status: "active",
      },
    },
    {
      //mongoose objects dite hoyy for findByIdAndUpdate given in document
      new: true,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          Error: "theres a sever side error",
        });
      } else {
        res.status(200).json({
          message: "todo updated successfully",
        });
      }
    }
  ).clone();
  console.log(result);
});

//delte todo
router.delete("/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "therea a server error bro!",
      });
    } else {
      res.status(200).json({
        message: "Bro its deleted! yo yo!",
      });
    }
  }).clone();
});

module.exports = router;
