import React, { useState, useEffect } from "react";
import { Form } from "./Form";
import { TodoList } from "./TodoList";
import axios from "axios";

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem("token");
  const addNewTodo = async (todoname) => {
    try {
      const res = await axios({
        method: "post",
        url: "/createTodo",
        data: {
          name: todoname,
        },
        headers: { "auth-token": token },
      });
      setTodos([...todos, res.data.todo]);
      
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTodos = async () => {
    try {
      const res = await axios.get("/getTodos", {
        headers: {
          "content-type": "application/json",
          "auth-token": token,
        },
      });

      setTodos(res.data.todos);
    } catch (error) {
      console.log(error);
    }
  };
  // EDIT
  const handleEdit = async (todo) => {
    try {
      const todoName = prompt("Enter your new name");
     

      if (!todoName) {
        alert("Please Enter todo name");
      } else {
        await axios({
          method: "put",
          url: `/editTodo/${todo._id}`,
          data: {
            name: todoName,
          },
          headers: { "auth-token": token },
        });
        const updatedTodos = [...todos];
        const index = updatedTodos.findIndex((u) => u._id === todo._id);
        updatedTodos[index] = { ...updatedTodos[index], name: todoName };
        setTodos(updatedTodos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const handleDelete = async (todoId) => {
    await axios.delete(`/deleteTodo/${todoId}`, {
      headers: {
        "content-type": "application/json",
        "auth-token": token,
      },
    });
    const newData = todos.filter((todo) => {
      return todo._id !== todoId;
    });
    setTodos(newData);
  };

  const handleCheck = async (todo)=>{
    try {
      await axios({
        method: "put",
        url: `/editTodo/${todo._id}`,
        data: {
          checked:!todo.checked
        },
        headers: { "auth-token": token },
      });
      const updatedTodos = [...todos];
      const index = updatedTodos.findIndex((u) => u._id === todo._id);
      updatedTodos[index] = { ...updatedTodos[index], checked: !todo.checked };
      setTodos(updatedTodos);
    } catch (error) {
      
    }
  }
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen font-[Poppins]">
    <div className="flex flex-col  items-center justify-center bg-[#046A91] shadow-2xl w-[400px] mx-auto py-6 rounded-3xl  ">
      <Form addNewTodo={addNewTodo} />
      <TodoList
        todos={todos}
        handleEdit={handleEdit}
        handleDelete={handleDelete} 
        handleCheck={handleCheck}
      />
    </div>
    </div>
  );
}

export default Dashboard;
