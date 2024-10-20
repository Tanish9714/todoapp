import React, { useEffect, useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from '../context/AuthProvider';
import "../styles/TodoList.css";

function TodoList({ todos, setTodos, startEdit }) {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/tasks?userId=${user.uid}`)
        .then((response) => response.json())
        .then((data) => setTodos(data))
        .catch((error) => console.error("Error fetching tasks:", error));
        console.log(user);
    } else {
      setTodos([]);
    }
  }, [user, setTodos]);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  // Define the handleComplete function
  const handleComplete = (id, completed) => {
    const updatedTask = { completed: !completed }; 
  
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update task completion status");
        }
        return response.json();
      })
      .then((updatedTodo) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo._id === id ? updatedTodo : todo))
        );
      })
      .catch((error) => console.error("Error updating task completion:", error));
  };  

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo._id} className={`note ${todo.completed ? "completed" : ""}`}>
          <h1 style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.task_title}
          </h1>
          <p>{todo.task_description}</p>
          <button className="complete-btn" onClick={() => handleComplete(todo._id, todo.completed)}>
            {todo.completed ? "Unmark" : "Complete"}
          </button>
          <button className="edit-btn" onClick={() => startEdit(todo)}>Edit</button>
          <button className="del-btn" onClick={() => handleDelete(todo._id)}>
            <DeleteIcon />
          </button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;