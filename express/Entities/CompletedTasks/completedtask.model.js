const mongoose = require("mongoose")

const CompletedTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  dateCompleted: {
    type: Date,
    required: true,
  },  
})

module.exports = mongoose.model("CompletedTask", CompletedTaskSchema, "CompletedTasks")