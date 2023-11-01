const mongoose = require('mongoose');

//Schema
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    required: [true, 'A task must have an image']
  }
});

//Model
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
