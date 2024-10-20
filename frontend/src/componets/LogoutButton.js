import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import '../styles/LogoutButton.css'; 

const LogoutButton = () => {
  const { LogOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await LogOut();
      alert("Logout successful!");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
