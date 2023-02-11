import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {AiOutlineLogout} from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Form = ({ addNewTodo }) => {
  const [todoName, setTodoName] = useState("");
  const [isloggedin, setIsloggedin] = useState(false);
  const navigate = useNavigate();
  const notify = () => toast("New Todo Added!");
  const handleSubmit = (event) => {
    event.preventDefault();
    addNewTodo(todoName).then(()=>notify());
   
    setTodoName("");
  };
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsloggedin(true);
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ToastContainer  />
      {isloggedin && (
        <div>
          
          <AiOutlineLogout  onClick={logout}
            className="absolute top-[3px] right-[5px] text-white bg-sky-900  focus:outline-none hover:bg-sky-600 rounded-xl text-2xl"
          ></AiOutlineLogout>

          <form onSubmit={handleSubmit}>
            <section className=" body-font relative">
              <div className="container px-5 py-8 ">
                <div className="flex flex-col text-center w-full mb-6">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font text-white">
                    Create Todo
                  </h1>
                </div>

                <div className="flex flex-row justify-center items-center flex-wrap m-2 ">
                  <div className="p-2 ">
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Todo Name"
                        className="w-full bg-gray-100  shadow-[0px_4px_15px_#29b0ff] placeholder:text-white placeholder:pl-3 bg-opacity-50 rounded-2xl outline-none  focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        value={todoName}
                        onChange={(event) => setTodoName(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="p-2 ">
                    <button
                      type="submit"
                      className="flex mx-auto text-white shadow-[0px_4px_15px_#29b0ff]  border rounded-3xl py-2 px-4 focus:outline-none hover:bg-sky-900  text-md "
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      )}
    </div>
  );
};
