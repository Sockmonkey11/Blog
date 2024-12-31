import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthConextProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthConextProvider>
    <App />
    </AuthConextProvider>
  </React.StrictMode>
);
