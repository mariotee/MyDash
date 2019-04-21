const mongoose = require("mongoose")

const IncompleteTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: Number,
    enum: [1,2,3,4,5],
    default: 5,    
  }
})

module.exports = mongoose.model("IncompleteTask", IncompleteTaskSchema, "IncompleteTasks")