
const Todo = require("../models/todoModal");

exports.home = (req, res) => {
  res.send("Hello  Home ");
};

exports.createTodo = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      throw new Error("Name  are Required");
    }
    
    const todo = await Todo.create({ name,  user:req.user });
    res.status(201).json({
      success: true,
      message: "Todo Created Successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user });
    res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editTodo = async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);
        if (!todo) { return res.status(404).send("Not Found") }
        if (todo.user?.toString() !== req.user) {
            return res.status(401).send("Not Allowed");
        }
    todo = await Todo.findByIdAndUpdate(req.params.id, {name:req.body.name , checked:req.body.checked});
    res.status(200).json({
      success: true,
      message: "todo updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    let todo = await Todo.findById(todoId);
        if (!todo) { return res.status(404).send("Not Found") }

        if (todo.user?.toString() !== req.user) {
            return res.status(401).send("Not Allowed");
        }
     todo = await Todo.findByIdAndDelete(todoId);
    res.status(200).json({
      success: true,
      message: "Todo Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
