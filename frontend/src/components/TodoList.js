
export const TodoList = ({ todos, handleEdit, handleDelete, handleCheck }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 ">
        <div className=" w-full mx-auto overflow-auto">
          <ul className="flex flex-col items-center ">
            {todos &&
              todos.map((todo) => (
                <li
                  className="flex flex-row gap-6 justify-between min-w-[300px] py-2 px-4 mb-3 border bg-sky-900 text-white rounded-3xl"
                  key={todo._id}
                >
                  <div className="round">
                    <input
                      type="checkbox"
                      id={todo._id}
                      checked={todo.checked}
                      onChange={() => handleCheck(todo)}
                    />
                    <label htmlFor={todo._id}></label>
                  </div>
                  {todo.name}
                  <div>
                    <button
                      className="hover:text-green-500 mr-3"
                      onClick={() => handleEdit(todo)}
                    >
                      Edit
                    </button>

                    <button
                      className="hover:text-red-500"
                      onClick={() => handleDelete(todo._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
