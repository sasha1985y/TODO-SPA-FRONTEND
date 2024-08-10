import { useState, useEffect } from "react";
import axios from "axios";

import { Todo } from "../types";
import { TodoListProps } from "../types";

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
          {todos?.map((todo: Todo) => {
            const chunkedName = todo.name.match(/.{1,50}/g); // Разбиваем строку на части по 20 символов
            return (
              <li key={todo.id} className="col bg-secondary-subtle p-3 rounded-4">
                <p className="text-center">
                  <div key={todo.id} className="todo-item">
                    {chunkedName && chunkedName.map((chunk, chunkIndex) => (
                      <span key={chunkIndex}>
                        {chunk}
                        {chunkIndex < chunkedName.length - 1 && <br />} {/* Добавляем <br> между частями */}
                      </span>
                    ))}
                  </div>
                </p>
                {" "}
                {todo.status && (
                  <div className="text-center">
                    <span className="text-light-emphasis">(Completed)</span>
                    <i onClick={() => deleteTodoClickHandler(todo.id)} className="fa-regular fa-trash-can"></i>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        <div className="col-md-4">
          <div className={`position-fixed row h-15 w-20 bg-secondary ${openEditUI ? "" : "invisible"}`}>
            <div className="col-md-2"></div>
            <div className="col bg-body-secondary rounded-4">
              <div className="row">
                <span className="col text-center fs-6">Edit</span>
                <div className="col-md-3 align-middle">
                  < input type="checkbox" checked={editStatus} onChange={() => setEditStatus(!editStatus)}/>
                </div>
                <i onClick={() => setOpenEditUI(false)} className="col-md-3 fs-5 fa-solid fa-xmark"></i>
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
