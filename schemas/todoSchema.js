const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  tittle: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//instance methods
todoSchema.methods = {
  findActive: function () {
    return mongoose.model("Todo").find({ status: "active" });
  },
  findActiveCallback: function (callback) {
    return mongoose.model("Todo").find({ status: "active" }, callback);
  },
};

//static methods
todoSchema.statics = {
  findByJS: function () {
    //this will give all tittels as output if a incluides in tittle
    return this.find({ tittle: /a/i });
  },
};

//query helpers
todoSchema.query = {
  byLanguage: function (language) {
    //this will give all tittels as output if a incluides in tittle
    return this.find({ tittle: new RegExp(language, "i") });
  },
};

module.exports = todoSchema;
