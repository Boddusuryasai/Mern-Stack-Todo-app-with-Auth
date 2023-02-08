const mongoose = require("mongoose");


const todoSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'account'
    },
  name: {
    type: String,
    require: [true, "Name is Required"],
    trim: true,
    maxlength: [25, "Name must be 25 Ch Long"],
  },
  checked:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model("Todo", todoSchema);
