import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Form = ({ addNewTodo }) => {
  const [todoName, setTodoName] = useState("");
  const [isloggedin, setIsloggedin] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    addNewTodo(todoName);
    setTodoName("");
  };
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsloggedin(true);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      {isloggedin && (
        <div>
          <button
            type="submit"
            onClick={logout}
            className="absolute top-0 right-0 text-white bg-sky-900 border-0 py-2 px-4 w-20 focus:outline-none hover:bg-sky-600 rounded-xl text-md"
          >
            Logout
          </button>

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
                        className="w-full bg-gray-100 placeholder:text-white placeholder:pl-3 bg-opacity-50 rounded-2xl outline-none  focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        value={todoName}
                        onChange={(event) => setTodoName(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="p-2 ">
                    <button
                      type="submit"
                      className="flex mx-auto text-white  border rounded-3xl py-2 px-4 focus:outline-none hover:bg-sky-900  text-md"
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
