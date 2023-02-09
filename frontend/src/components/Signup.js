import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState({
    show: false,
    errMsg: "",
  });
  const navigate = useNavigate();
  const submitData = () => {
    const data = {
      username: username,
      email: email,
      password: password,
    };
    axios
      .post(`${BASE_URL}/signup`, data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.response.data.errors) {
          setMsg({
            ...msg,
            show: true,
            errMsg: error.response.data.errors[0].msg,
          });
        } else {
          setMsg({ ...msg, show: true, errMsg: error.response.data.msg });
        }
      });
  };
  // To handle the Default
  const handleSubmit = (event) => {
    event.preventDefault();
    // To submit the Data
    submitData();
  };

  return (
    <div>
      {msg.show && (
        <div
          className="flex bg-yellow-100 rounded-lg p-4 mb-4 text-sm text-yellow-700"
          role="alert"
        >
          <svg
            className="w-5 h-5 inline mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div>
            <span className="font-medium">Warning alert!</span> {msg.errMsg}
          </div>
        </div>
      )}
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 ">
        <div>
          <div>
            <h3 className="text-4xl font-bold  text-sky-900">
              SIGN IN
            </h3>
          </div>
        </div>
        <div className="w-full border-blue-500 px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg ">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  autoComplete="off"
                  placeholder="Enter User Name"
                  onChange={(event) => setUsername(event.target.value)}
                  required
                  className="block w-full mt-1 border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Email"
                  autoComplete="off"
                  onChange={(event) => setEmail(event.target.value)}
                  className="block w-full mt-1 border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  placeholder="Password"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                  className="block w-full mt-1 border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="flex items-center justify-end mt-4">
              <button
                type="submit"
                className="w-full my-3 text-center items-center bg-gradient-to-r from-sky-500 to-sky-900 px-4 py-2  text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out  border border-transparent rounded-md active:bg-sky-600 hover:bg-sky-600 false"
              >
                SIGN UP
              </button>
            </div>
            <div className="flex items-center justify-between gap-3 mt-4">
              <Link
                className="text-sm text-gray-600 underline hover:text-gray-900"
                to="/login"
              >
                Already registered?
              </Link>
              <Link to="/login">
                <button className="w-full my-3 text-center items-center px-4 py-2  text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-sky-900 border border-transparent rounded-md active:bg-sky-600 hover:bg-sky-600 false">
                  LOGIN HERE
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
