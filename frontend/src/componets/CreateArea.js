import React, { useEffect,useContext } from "react";
import "../styles/CreateArea.css";
import { AuthContext } from "../context/AuthProvider";

function CreateArea({ setTodos, editId, setEditId, cancelEdit, input, setInput }) {

  const { user } = useContext(AuthContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const taskData = {
      task_title: input.title,
      task_description: input.description,
      userId: user.uid, // Add userId from authenticated user
    };

    if (editId) {
      fetch(`https://todoapp-mmrr.onrender.com/tasks/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      })
        .then((response) => response.json())
        .then((updatedTodo) => {
          setTodos((prevTodos) =>
            prevTodos.map((todo) => (todo._id === editId ? updatedTodo : todo))
          );
          cancelEdit();
          setInput({ title: "", description: "" });
        })
        .catch((error) => console.error("Error updating task:", error));
    } else {
      fetch("https://todoapp-mmrr.onrender.com/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      })
        .then((response) => response.json())
        .then((data) => setTodos((prevTodos) => [...prevTodos, data]))
        .catch((error) => console.error("Error adding task:", error));

      setInput({ title: "", description: "" });
    }
  };

  useEffect(() => {
    if (editId) {
      // If in edit mode, fetch the task data
      fetch(`https://todoapp-mmrr.onrender.com/tasks/${editId}`)
        .then((response) => response.json())
        .then((task) => {
          setInput({
            title: task.task_title,
            description: task.task_description,
          });
        })
        .catch((error) => console.error("Error fetching task:", error));
    } else {
      setInput({ title: "", description: "" }); // Reset input if not editing
    }
  }, [editId, setInput]);

  return (
    <form className="create-note" onSubmit={handleSubmit}>
      <input
        name="title"
        value={input.title}
        onChange={handleChange}
        placeholder="Task Title"
        required
      />
      <textarea
        name="description"
        value={input.description}
        onChange={handleChange}
        placeholder="Task Description"
        required
      />

      {editId ? (
        <>
          <button type="submit" className="add-task-btn">
            Update
          </button>
          <button type="button" onClick={cancelEdit} className="cancel-btn">
            Cancel
          </button>
        </>
      ) : (
        <button type="submit" className="add-task-btn">
          Add
        </button>
      )}
    </form>
  );
}

export default CreateArea;
