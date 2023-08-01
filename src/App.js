import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./components/TodoList";

const App = () => {
  const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;

    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), text: newTodo, completed: false },
    ]);
    setNewTodo("");
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleCompleteTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="app">
      <h1>Todo App</h1>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Enter your todo"
          value={newTodo}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <TodoList
        todos={todos}
        onDelete={handleDeleteTodo}
        onComplete={handleCompleteTodo}
      />
    </div>
  );
};

export default App;
