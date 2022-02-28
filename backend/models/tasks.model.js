const mongoose = require("mongoose"); // including mongoose

//making the instance of schema that we can use to add tasks
const Schema = mongoose.Schema;

const taskSchema = new Schema(  
  {
    name: { type: String, required: true },
    task: { type: String, required: true },
    duration: { type: Number, required: true },
    startdate: { type: Date, required: true },
    enddate: { type: Date, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema); //converting schema into model 

module.exports = Task;
