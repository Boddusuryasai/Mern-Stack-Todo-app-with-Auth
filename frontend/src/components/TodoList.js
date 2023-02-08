import { AiFillDelete , AiFillEdit } from 'react-icons/ai';
export const TodoList = ({ todos, handleEdit, handleDelete, handleCheck }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 ">
        <div className=" w-full mx-auto overflow-auto">
          <ul className="flex flex-col items-center ">
            {todos &&
              todos.map((todo) => (
                <li
                  className="flex flex-row gap-6 justify-between min-w-[300px] py-2 px-4 mb-3 bg-[#155A82] shadow-lg text-white rounded-3xl"
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
                  <div className='flex gap-2 justify-center items-center '>
                    <AiFillDelete className='hover:text-sky-600' onClick={() => handleDelete(todo._id)}></AiFillDelete>
                    <AiFillEdit className='hover:text-sky-600' onClick={() => handleEdit(todo)}></AiFillEdit>
                    
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
