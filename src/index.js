import React from 'react';
import ReactDOM from 'react-dom/client'; // Atualizado para 'react-dom/client'
import './index.css'; // Estilos globais
import App from './App'; // Importação do App.jsx
import reportWebVitals from './reportWebVitals'; // Métricas de desempenho

// Cria o root para o React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Relatar métricas de desempenho
reportWebVitals();
