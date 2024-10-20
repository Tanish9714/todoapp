import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import "../styles/Header.css";

function Header() {
  return (
    <header>
      <h1>
        <HighlightIcon />
        Todo List
      </h1>
    </header>
  );
}

export default Header;
