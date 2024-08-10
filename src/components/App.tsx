import { useState, useEffect } from "react";
import axios from "axios";

import { Todo } from "../types";

function App() {

  const [todos, setTodos] = useState<Todo[]>([])
  const [editStatus, setEditStatus] = useState(false)
  const [editName, setEditName] = useState('')
  const [openEditUI, setOpenEditUI] = useState(true)

  const addTodoClickHandler = (): void => {
    console.log('works!!!');
  }

  const deleteTodoClickHandler = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id));
    console.log('deleted!!!');
  }

  useEffect(() => {
    const fetchTodos = async () => {
      const {data} = await axios.get<Todo[]>('http://127.0.0.1:8000/todos/')
      setTodos(data)
    }
    fetchTodos();
  }, [])

  return (
    <div className="h-auto bg-secondary position-relative">
      <div className="h-5 d-inline-block"></div>
      <h1 className="text-center">Todo App</h1>
      <div className="d-flex justify-content-center hstack gap-2">
        <input className="w-75 bg-body-secondary rounded-start-pill"></input>
        <div onClick={addTodoClickHandler} className="w-20 bg-body-secondary rounded-end-pill border border-dark-subtle border-3">
          <i className="text-secondary fa-solid fa-square-plus"></i>
        </div>
      </div>
      <div className="h-5 d-inline-block"></div>
      <div className="row">
        <div className="col-md-2"></div>
        <ol className="col d-inline-block">
          {todos?.map((todo: Todo) => (
            <>
              <li key={todo.unique_id} className="col bg-secondary-subtle p-3 rounded-4">
                <p>{todo.name}</p>
                {" "}
                {todo.status && (
                  <>
                    <span className="text-light-emphasis">(Completed)</span>
                    <i onClick={() => deleteTodoClickHandler(todo.id)} className="fa-regular fa-trash-can"></i>
                  </>
                )}
              </li>
              <ol className="h-5 d-inline-block"></ol>
            </>
          ))}
        </ol>
        <div className="col-md-4 d-flex justify-content-center">
          <div className={`position-fixed row h-15 w-20 bg-secondary p-2 ${openEditUI ? "" : "invisible"}`}>
            <div className="col-md-2"></div>
            <div className="col bg-body-secondary rounded-4">
              <span className="text-center fs-6">Edit Todo</span>
              <div className="d-flex justify-content-center hstack gap-2">
                <i onClick={() => setOpenEditUI(false)} className="fs-1 fa-solid fa-xmark"></i>
                <input type="checkbox" checked={editStatus} onChange={() => setEditStatus(!editStatus)}/>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
