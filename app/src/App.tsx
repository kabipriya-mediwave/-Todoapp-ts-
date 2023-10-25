import { useState, useEffect } from "react";

import { ITodo } from "./types";

import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<ITodo[]>(getFromLocalStorage());

  useEffect(() => {
    return localStorage.setItem("my-todos", JSON.stringify(todos));
  }, [todos]);
  function getFromLocalStorage(): ITodo[] {
    const storedData = localStorage.getItem("my-todos");
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return [];
    }
  }
  function onTodoAdd(str: string) {
    const obj: ITodo = {
      text: str,
      id: new Date().getTime(),
      isEdit: false,
      isCompleted: false,
    };
    setTodos((prev) => [...prev, obj]);
  }
  function handleDelete(id: Number) {
    const filtered = todos.filter((t) => t.id != id);
    setTodos(filtered);
  }

  function handleUpdate(id: Number) {
    const findindex = todos.findIndex((t) => t.id === id);
    const updatedItems = [...todos];
    updatedItems[findindex] = {
      ...updatedItems[findindex],
      isEdit: true,
    };
    setTodos(updatedItems);
  }
  function handleSaveClick(id: Number, text: string) {
    const updatedItems = [...todos];
    const findindex = updatedItems.findIndex((nt) => nt.id === id);
    if (findindex !== -1) {
      updatedItems[findindex]["text"] = text;
      updatedItems[findindex]["isEdit"] = false;
    }

    setTodos(updatedItems);
  }
  function setStrike(todos: ITodo[]) {
    setTodos(todos);
  }
  return (
    <div>
      <h1>MY TODO LIST</h1>
      <AddTodo onTodoAdd={onTodoAdd} />
      <TodoList
        todos={todos}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        handleSaveClick={handleSaveClick}
        setStrike={setStrike}
        extraCss="text-bold"
      />
    </div>
  );
}

export default App;
