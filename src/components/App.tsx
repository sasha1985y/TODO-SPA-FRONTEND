import { useState, useEffect } from "react";
import axios from "axios";

import { Todo } from "../types";

function App() {

  const [todos, setTodos] = useState<Todo[]>([])
  const [editStatus, setEditStatus] = useState(false)
  const [editName, setEditName] = useState('')
  const [editTodo, setEditTodo] = useState({})
  const [openEditUI, setOpenEditUI] = useState(false)

  const addTodoClickHandler = (): void => {
    console.log('works!!!');
  }

  const editTodoHandler = (id: number) => {
    if (editTodo) {
      console.log(id);
      // Здесь можно добавить логику обновления todo
    }
  };
  


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
          <i className="text-success fa-solid fa-square-plus"></i>
        </div>
      </div>
      <div className="h-5 d-inline-block"></div>
      <div className="row">
        <div className="col-md-1"></div>
        <ol className="col d-inline-block">
          {todos?.map((todo: Todo) => {
            const chunkedName = todo.name.match(/.{1,50}/g); // Разбиваем строку на части по 20 символов
            return (
              <li key={todo.id} className="col bg-secondary-subtle mb-1 rounded-4">
                <p className="text-center" onClick={() => {
                  setEditStatus(todo.status)
                  setEditName(todo.name)
                  setEditTodo(todo)
                  setOpenEditUI(true)
                }}>
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
                  <div className="text-center position-relative">
                    <span className="text-light-emphasis">(Completed)</span>
                    <i onClick={() => deleteTodoClickHandler(todo.id)} className="text-danger fs-3 position-absolute bottom-0 end-0 fa-regular fa-trash-can"></i>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        <div className="col-md-4">
          <div className={`position-fixed row h-15 w-20 bg-secondary ${openEditUI ? "" : "invisible"}`}>
            <div className="col-md-2"></div>
            <ul className="col bg-body-secondary rounded-4">
              <li className="d-flex justify-content-around hstack gap-2">
                <span className="fs-6">Editor</span>
                < input type="checkbox" checked={editStatus} onChange={() => setEditStatus(!editStatus)}/>
                <i>status</i>
                <i onClick={() => setOpenEditUI(false)} className="text-danger fs-5 fa-solid fa-xmark"></i>
              </li>
              <li className="input-group">
                <textarea className="form-control" value={editName} onChange={(e) => setEditName(e.target.value)}></textarea>
              </li>
              <li>
                <button onClick={() => editTodoHandler(editTodo.id)} className="btn btn-success">Update</button>
              </li>
            </ul>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
