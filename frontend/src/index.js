import React from 'react';
import ReactDOM from 'react-dom';
import App from './componets/App';
import AuthProvider from './context/AuthProvider'; // Ensure correct path

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>  {/* AuthProvider should wrap your whole app */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);