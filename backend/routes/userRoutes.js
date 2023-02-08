// URL PATH
const express = require("express");
const {
  home,
  createTodo,
  getTodos,
  editTodo,
  deleteTodo,
} = require("../controllers/todoControllers");
const getAccountUser = require("../middleware/getAccountUser")

const router = express.Router();

router.get("/", home);
const signup = require("../controllers/signup")
const login = require("../controllers/login")
const { body } = require('express-validator');
router.post("/login",login)
router.post("/signup",  [
    body('username', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ],signup)
router.post("/createTodo", getAccountUser , createTodo);
router.get("/getTodos",getAccountUser ,getTodos);
router.put("/editTodo/:id",getAccountUser, editTodo);
router.delete("/deleteTodo/:id",getAccountUser, deleteTodo);
module.exports = router;
