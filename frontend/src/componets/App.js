import React, { useState, useContext } from 'react';
import Header from "./Header";
import TodoList from "./TodoList";
import CreateArea from "./CreateArea";
import { AuthContext } from '../context/AuthProvider'; 
import AuthButtons from './AuthButtons';
import "../styles/App.css";
import LogoutButton from './LogoutButton';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState({ title: "", description: "" }); 
  const [editId, setEditId] = useState(null); 
  const { user, loading } = useContext(AuthContext); 

  const cancelEdit = () => {
    setEditId(null);
    setInput({ title: "", description: "" }); 
  };

  if (loading) {
    return <div>Loading...</div>;  
  }

  return (
    <>
      <Header />
      {user ? (
        <div>
          <LogoutButton />
          <CreateArea
          input={input}
          setInput={setInput}
          setTodos={setTodos}
          editId={editId}
          setEditId={setEditId}
          cancelEdit={cancelEdit} 
        />
        </div>
        
      ) : (
        
        <div className="login-message">
          <AuthButtons /> 
        </div>
        
      )}

      <TodoList
        todos={todos}
        setTodos={setTodos}
        startEdit={(todo) => {
          setInput({ title: todo.task_title, description: todo.task_description });
          setEditId(todo._id);
        }}
      />
     
    </>
  );
}

export default App;
