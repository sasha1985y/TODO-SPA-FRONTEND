import { useState, useEffect } from "react";
import axios from "axios";

import { Todo } from "../types";

function App() {

  const [todos, setTodos] = useState<Todo[]>([])

  const addTodoClickHandler = (): void => {
    console.log('works!!!');
  }

  useEffect(() => {
    const fetchTodos = async () => {
      const {data} = await axios.get<Todo[]>('http://127.0.0.1:8000/todos/')
      setTodos(data)
    }
    fetchTodos();
  }, [])

  return (
    <div className="vh-100 bg-secondary position-relative">
      <h1 className="text-center">Todo App</h1>
      <div className="d-flex justify-content-center hstack gap-2">
        <input className="w-75 bg-body-secondary rounded-start-pill"></input>
        <div onClick={addTodoClickHandler} className="w-20 bg-body-secondary rounded-end-pill border border-dark-subtle border-3">
          <i className="text-secondary fa-solid fa-square-plus"></i>
        </div>
      </div>
      <div className="h-5 d-inline-block"></div>
      <div className="d-flex justify-content-center h-25 d-inline-block">
        {todos?.map((todo: Todo) => (
          <div key={todo.id} className="text-center w-50 bg-secondary-subtle p-3 rounded-4">
            <p>{todo.name}</p>
            {" "}
            {todo.status && (
              <span className="text-light-emphasis">(Completed)</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
