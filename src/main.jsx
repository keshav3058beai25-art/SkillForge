import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './context/AppContext';
import App from './App.jsx';

/**
 * Entry Point
 * 
 * The AppProvider wraps the entire App, making global state
 * available to every component via useContext(AppContext).
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
